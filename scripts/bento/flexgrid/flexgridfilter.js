var wijmo;
(function(wijmo) {
    (function(_grid) {
        (function(valuefilter) {
            'use strict';

            /**
             * Implements an Excel-style filter for @see:FlexGrid controls.
             *
             * To enable filtering on a @see:FlexGrid control, create an instance
             * of the @see:FlexGridFilter and pass the grid as a parameter to the
             * constructor. For example:
             *
             * <pre>
             * // create FlexGrid
             * var flex = new wijmo.grid.FlexGrid('#gridElement');
             * // enable filtering on the FlexGrid
             * var filter = new wijmo.grid.filter.FlexGridFilter(flex);
             * </pre>
             *
             * Once this is done, a filter icon is added to the grid's column headers.
             * Clicking the icon shows an editor where the user can edit the filter
             * conditions for that column.
             *
             * The @see:FlexGridFilter class depends on the <b>wijmo.grid</b> and
             * <b>wijmo.input</b> modules.
             */
            var FlexGridFilter = (function() {
                /**
                 * Initializes a new instance of the @see:FlexGridFilter.
                 *
                 * @param grid The @see:FlexGrid to filter.
                 */
                function FlexGridFilter(grid) {
                    this._showIcons = true;
                    /**
                     * Occurs after the filter is applied.
                     */
                    this.filterApplied = new wijmo.Event();

                    /**
                     * Bento Added
                     * Occurs after the filter has been toggled.
                     */
                    this.filterToggled = new wijmo.Event();
                    /**
                     * Bento Added
                     * Occurs after the filter has been clicked in.
                     */
                    this.filterClicked = new wijmo.Event();
                    /**
                     * Bento Added
                     * Occurs after the filter textbox has been searched in.
                     */
                    this.filterSearched = new wijmo.Event();
                    /**
                     * Bento Added
                     * Occurs in Item Formatter.
                     */
                    this.filterUpdated = new wijmo.Event();

                    // check dependencies
                    var depErr = 'Missing dependency: FlexGridFilter requires ';
                    wijmo.assert(wijmo.grid.FlexGrid != null, depErr + 'wijmo.grid.');
                    wijmo.assert(wijmo.input.ComboBox != null, depErr + 'wijmo.input.');

                    // initialize filter
                    this._filters = [];
                    this._colFilters = {}; //BENTO ADDED, hash table of column filters using column binding as key
                    this._searchText = ""; //BENTO ADDED
                    this._selectedItems = []; //BENTO ADDED
                    this._filterTimer; //BENTO ADDED
                    this._grid = wijmo.asType(grid, _grid.FlexGrid, false);
                    this._grid.formatItem.addHandler(this._formatItem.bind(this));
                    this._grid.itemsSourceChanged.addHandler(this.clear.bind(this));
                    this._grid.hostElement.addEventListener('mousedown', this._mouseDown.bind(this), true);

                    // initialize column filters
                    this._grid.invalidate();
                }
                Object.defineProperty(FlexGridFilter.prototype, "showFilterIcons", {
                    /**
                     * Gets or sets a value indicating whether the @see:FlexGridFilter adds filter
                     * editing buttons to the grid's column headers.
                     */
                    get: function() {
                        return this._showIcons;
                    },
                    set: function(value) {
                        this._showIcons = wijmo.asBoolean(value);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FlexGridFilter.prototype, "filterColumns", {
                    /**
                     * Gets or sets an array containing the names or bindings of the columns
                     * that have filters.
                     *
                     * Setting this property to null or to an empty array adds filters to all
                     * columns.
                     */
                    get: function() {
                        return this._filterColumns;
                    },
                    set: function(value) {
                        this._filterColumns = wijmo.asArray(value);
                        this.clear();
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                 * Gets the filter for the given column.
                 *
                 * @param col The @see:Column that the filter applies to.
                 * @param create The value indicating whether to create the filter if it does not exist.
                 */
                FlexGridFilter.prototype.getColumnFilter = function(col, create) {
                    if (typeof create === "undefined") {
                        create = true;
                    }

                    for (var i = 0; i < this._filters.length; i++) {
                        if (this._filters[i].column == col) {
                            return this._filters[i];
                        }
                    }
                    //BENTO ADDED
                    this._resetVars()
                    // not found, create one now
                    if (create) {
                        var cf = new valuefilter.ColumnFilter(col);
                        this._filters.push(cf);
                        return cf;
                    }

                    // not found, not created
                    return null;

                };

                /**
                 * Shows the filter editor for the given grid column.
                 *
                 * @param col The @see:Column that contains the filter to edit.
                 */
                FlexGridFilter.prototype.editColumnFilter = function(col) {
                    // remove current editor
                    this.closeEditor();

                    // get column by name of by reference
                    col = wijmo.isString(col) ? this._grid.columns.getColumn(col) : wijmo.asType(col, _grid.Column, false);

                    // get the header cell to position editor
                    var ch = this._grid.columnHeaders,
                        rc = ch.getCellBoundingRect(ch.rows.length - 1, col.index);

                    // get the filter and the editor
                    var div = document.createElement('div'),
                        flt = this.getColumnFilter(col, true),
                        edt = new valuefilter.ColumnFilterEditor(div, flt);
                    wijmo.addClass(div, 'wj-dropdown-panel');

                    //BENTO ADDED - reference to column filter editor to be used for onFilterClicked
                    this._edt = edt;

                    // close editor when buttons are clicked or when it loses focus
                    var self = this;
                    edt.filterChanged.addHandler(function(obj) {
                        //BEGIN BENTO ADDED
                        self.onFilterClicked(obj.event);
                        self._selectedItems = [];
                        if (obj.listCollectionView) {
                            for (var i = 0, il = obj.listCollectionView.items.length; i < il; i++) {
                                var item = obj.listCollectionView.items[i];
                                if (item.show) {
                                    self._selectedItems.push(item.value);
                                }
                            }
                        }
                        if (obj.event.target == edt._btnApply) {
                            // console.log('apply',obj)
                            self.apply();
                        }
                        //END BENTO ADDED
                        self.closeEditor();
                    });

                    //BENTO ADDED
                    edt.selectAllClicked.addHandler(function(obj, evt) {
                        self.onFilterClicked(evt);
                    })
                    //BENTO ADDED
                    edt.filterTextChanged.addHandler(function(obj, text) {
                        self.filterSearched.raise({
                            text: text,
                            col: col
                        });
                        self._searchText = text;
                    });
                    // use blur+capture to emulate focusout (not supported in FireFox)
                    //BENTO ADDED - take out blur behavior for iOS
                    if (!document.body.className.match(/\bios\b/)) {
                        div.addEventListener('blur', function() {
                            setTimeout(function() {
                                if (!wijmo.contains(self._divEdt, document.activeElement)) {
                                    self.closeEditor();
                                }
                            }, 200); // let others handle it first
                        }, true);
                    }
                    // show editor and give it focus
                    var host = document.body;
                    host.appendChild(div);
                    div.tabIndex = -1;
                    wijmo.showPopup(div, rc);
                    div.focus();

                    // save reference to editor
                    this._divEdt = div;
                    this._edtCol = col;
                };

                /**
                 * Closes the filter editor.
                 */
                FlexGridFilter.prototype.closeEditor = function() {
                    if (this._divEdt) {
                        wijmo.hidePopup(this._divEdt, true);
                        this._divEdt = null;
                        this._edtCol = null;
                    }
                };

                /**
                 * BENTO ADDED
                 * Column Filter Editor Event Handlers
                 */
                FlexGridFilter.prototype.onFilterClicked = function(evt) {
                    // DOM ELEMENTS REFERENCED FROM ColumnFilterEditor.js
                    // _btnAsc: 'btn-asc',
                    // _btnDsc: 'btn-dsc',
                    // _divFilter: 'div-filter',
                    // _cbSelectAll: 'cb-select-all',
                    // _divValues: 'div-values',
                    // _btnApply: 'btn-apply',
                    // _btnClear: 'btn-clear',
                    // _btnClose: 'btn-close' //BENTO ADDED 

                    if (!this._edt || !evt) {
                        return;
                    }

                    var binding = this._edtCol.binding;

                    if (!this._colFilters[binding]) {
                        this._colFilters[binding] = {};
                    }

                    switch (evt.target) {
                        case this._edt._btnClose:
                            this.filterClicked.raise({
                                type: 'close',
                                col: this._edtCol
                            });
                            break;
                            // case this._edt._btnApply:
                            //     this.filterClicked.raise({type:'apply',col:this._edtCol});
                            //     break;
                        case this._edt._btnAsc:
                            this._colFilters[binding].sortDirection = 'asc';
                            this.filterClicked.raise({
                                type: 'ascending',
                                col: this._edtCol
                            });
                            break;
                        case this._edt._btnDsc:
                            this._colFilters[binding].sortDirection = 'desc';
                            this.filterClicked.raise({
                                type: 'descending',
                                col: this._edtCol
                            });
                            break;
                        case this._edt._btnClear:
                            delete this._colFilters[binding];
                            this.filterClicked.raise({
                                type: 'clear',
                                col: this._edtCol
                            });
                            break;
                        case this._edt._cbSelectAll:
                            this._colFilters[binding]
                            this.filterClicked.raise({
                                type: 'select-all',
                                col: this._edtCol
                            });
                            break;
                    }
                }
                /**
                 * Applies the current column filters to the grid.
                 */
                FlexGridFilter.prototype.apply = function() {
                    var cv = this._grid.collectionView;
                    if (cv) {
                        if (cv.filter) {
                            cv.refresh();
                        } else {
                            cv.filter = this._filter.bind(this);
                        }
                    }

                    if (this._edtCol && this._edtCol.binding) {

                        var binding = this._edtCol.binding;
                        if (!this._colFilters[binding]) {
                            this._colFilters[binding] = {};
                        }
                        //build up column filter object
                        //this._colFilters[binding].columnName = this._edtCol ? this._edtCol.binding : undefined;
                        this._colFilters[binding].searchText = this._searchText;
                        this._colFilters[binding].valFilter = this._selectedItems.slice(0); //clone array
                    }

                    this.onFilterApplied();
                };

                /**
                 * Clears all column filters.
                 */
                FlexGridFilter.prototype.clear = function() {
                    this._filters = [];
                    this._resetVars();
                    this.apply();
                };

                /**
                 * Raises the @see:filterApplied event.
                 */
                FlexGridFilter.prototype.onFilterApplied = function() {
                    console.log('on filter applied')
                    this.filterApplied.raise(this);
                };

                // predicate function used to filter the CollectionView
                FlexGridFilter.prototype._filter = function(item) {
                    for (var i = 0; i < this._filters.length; i++) {
                        if (!this._filters[i].apply(item)) {
                            return false;
                        }
                    }
                    return true;
                };

                // handle the formatItem event to add filter icons to the column header cells
                FlexGridFilter.prototype._formatItem = function(sender, e) {
                    // check that this is a filter cell
                    if (this._showIcons && e.panel.cellType == 2 /* ColumnHeader */ && e.row == this._grid.columnHeaders.rows.length - 1) {
                        // check that this column should have a filter
                        var col = this._grid.columns[e.col];
                        if (!this._filterColumns || this._filterColumns.indexOf(col.binding) > -1) {
                            // show filter glyph for this column
                            // var cf = this.getColumnFilter(col, true), op = cf.isActive ? .85 : .25, filterGlyph = '<div ' + FlexGridFilter._WJA_FILTER + ' style ="float:right;cursor:pointer;padding:0px 4px;opacity:' + op + '">' + '<span class="wj-glyph-filter"></span>' + '</div>';
                            //BENTO ADDED - use css style instead of inline style
                            var cf = this.getColumnFilter(col, true),
                                css = cf.isActive ? 'active' : '',
                                filterGlyph = '<div ' + FlexGridFilter._WJA_FILTER + ' class="' + css + '">' + '<span class="filter-icon"></span>' + '</div>';

                            // insert filter glyph before cell content (so it appears in Firefox...)
                            e.cell.innerHTML = filterGlyph + e.cell.innerHTML;
                            //BENTO ADDED - add class
                            e.cell.className += ' has-filter';
                        }
                        //BEGIN BENTO ADDED
                        //iterate through column headers and get sort direction
                        for (var sd = this._grid.collectionView.sortDescriptions, il = sd.length, i = 0; i < il; i++) {
                            //check if column binding matches a sort description
                            //Delete any sort direction by default
                            if (this._colFilters[col.binding]) {
                                //delete sort
                                delete this._colFilters[col.binding].sortDirection;
                                //delete object if empty
                                if (Object.keys(this._colFilters[col.binding]).length === 0 
                                    || (Object.keys(this._colFilters[col.binding]).length == 1 && this._colFilters[col.binding].columnName)) {
                                    delete this._colFilters[col.binding];
                                }

                            }
                            if (sd[i].property == col.binding) {

                                //if column filter object does not exist, create one
                                if (!this._colFilters[col.binding]) {
                                    this._colFilters[col.binding] = {};
                                }
                                //add class name
                                // e.cell.className += ' is-sorted';
                                if (sd[i].ascending == true) {
                                    this._colFilters[col.binding].sortDirection = 'asc';
                                    // e.cell.className += ' asc';
                                } else {
                                    this._colFilters[col.binding].sortDirection = 'desc';
                                    // e.cell.className += ' desc';
                                }
                            }
                        }

                        var self = this;
                        clearTimeout(this._filterTimer);
                        //Call Once Filter Update Event

                        this._filterTimer = setTimeout(function() {
                            if (self._colFilters && Object.keys(self._colFilters).length !== 0) {
                                var colFilterArray = Object.keys(self._colFilters).map(function(key) {
                                    self._colFilters[key].columnName = key;
                                    return self._colFilters[key];
                                });
                                console.log('filterUpdated', colFilterArray);

                                self.filterUpdated.raise(colFilterArray);
                            }
                        });
                        //END BENTO ADDED


                    }
                };

                // handle mouse down to show/hide the filter editor
                FlexGridFilter.prototype._mouseDown = function(e) {
                    if (this._hasAttribute(e.target, FlexGridFilter._WJA_FILTER)) {
                        var ht = this._grid.hitTest(e);
                        if (ht.gridPanel == this._grid.columnHeaders) {
                            var col = this._grid.columns[ht.col];
                            if (this._divEdt && this._edtCol == col) {
                                this.closeEditor();
                                this.filterToggled.raise({
                                    isOpen: false,
                                    column: col
                                });
                            } else {
                                this.editColumnFilter(col);
                                this.filterToggled.raise({
                                    isOpen: true,
                                    column: col
                                });
                            }
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }
                };

                FlexGridFilter.prototype._resetVars = function() {
                    this._searchText = "";
                    this._selectedItems = [];

                }
                // checks whether an element or any of its ancestors contains an attribute
                FlexGridFilter.prototype._hasAttribute = function(e, att) {
                    for (; e; e = e.parentNode) {
                        if (e.getAttribute && e.getAttribute(att) != null)
                            return true;
                    }
                    return false;
                };
                FlexGridFilter._WJA_FILTER = 'wj-filter';
                return FlexGridFilter;
            })();
            valuefilter.FlexGridFilter = FlexGridFilter;
        })(_grid.valuefilter || (_grid.valuefilter = {}));
        var valuefilter = _grid.valuefilter;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));