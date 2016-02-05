(function () {
    'use strict';
    /**
     * FOR DEMO PURPOSES - Some common methods for 
     * initializing and configuring FlexGrid, such as
     * localization, setting up multi-select checkbox, 
     * filters and row height. 
     */
    angular
        .module('services')
        .service('flexGridSetUpService', flexGridSetUpService);

    flexGridSetUpService.$inject = ['$rootScope', '$timeout'];

    function flexGridSetUpService($rootScope, $timeout) {
        var self = this;
        var ON_MULTI_SELECT = 'onMultiSelect';
        this.multiSelectPanelObj = {}

        this.setUpCulture = function () {
            wijmo.culture.FlexGridFilter = {
                // filter
                ascending: '\u2191 Ascending',
                descending: '\u2193 Descending',
                apply: 'Apply',
                clear: 'Clear',
                conditions: 'Filter by Condition',
                values: 'Filter by Value',
                // value filter
                search: 'Search',
                selectAll: 'Select All',
                null: '(nothing)',
                // condition filter
                header: 'Show items where the value',
                and: 'And',
                or: 'Or',
                stringOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Does not equal', op: 1 /* NE */ },
                    { name: 'Begins with', op: 6 /* BW */ },
                    { name: 'Ends with', op: 7 /* EW */ },
                    { name: 'Contains', op: 8 /* CT */ },
                    { name: 'Does not contain', op: 9 /* NC */ }
                ],
                numberOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Does not equal', op: 1 /* NE */ },
                    { name: 'Is Greater than', op: 2 /* GT */ },
                    { name: 'Is Greater than or equal to', op: 3 /* GE */ },
                    { name: 'Is Less than', op: 4 /* LT */ },
                    { name: 'Is Less than or equal to', op: 5 /* LE */ }
                ],
                dateOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Is Before', op: 4 /* LT */ },
                    { name: 'Is After', op: 2 /* GT */ }
                ],
                booleanOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Does not equal', op: 1 /* NE */ }
                ]
            };
        }
        this.setUpMultiSelect = function (panel, r, c, cell, binding) {
            var flex = panel.grid;
            var col = flex.columns[c];
            // check that this is a boolean column

            if (panel.cellType !== wijmo.grid.CellType.RowHeader && col && col.dataType == wijmo.DataType.Boolean && col.binding === binding) {
                //For column header checkbox only
                if (panel.cellType == wijmo.grid.CellType.ColumnHeader) {
                    // prevent sorting on click
                    col.allowSorting = false;
                    // count true values to initialize checkbox
                    var cnt = 0;
                    for (var i = 0; i < flex.rows.length; i++) {
                        if (flex.getCellData(i, c) == true) cnt++;
                    }
                    // create and initialize checkbox
                    var innerHTML = cell.innerHTML;



                    // cell.innerHTML = '<div class="cell-checkbox"> ';
                    cell.innerHTML = '<input type="checkbox"> ';

                    // var cb = {};
                    var cb = cell.firstChild;
                    cb.checked = cnt > 0;
                    cb.indeterminate = cnt > 0 && cnt < flex.rows.length;

                    cb.removeEventListener('click', __cbListener);
                    cb.addEventListener('click', __cbListener);

                    //Set up custom sorting for checkbox column
                    cell.removeEventListener('click', __cellListener);
                    cell.addEventListener('click', __cellListener);




                    // if(cnt > 0){
                    //     cell.innerHTML = '<div class="cell-checkbox active"> ';
                    // }
                    // if(cnt > 0 && cnt < flex.rows.length){
                    //     cell.innerHTML = '<div class="cell-checkbox indeterminate"> ';
                    // }

                    // cell.removeEventListener('click', __customCBListener);
                    // cell.addEventListener('click', __customCBListener);

                    self.multiSelectPanelObj = {
                        panel: panel,
                        r: r,
                        c: c,
                        cell: cell,
                        flex: flex,
                        col: col,
                        cb: cb
                    }
                }
                //add col-select class to whole column cell
                cell.className += ' col-select';
                // if(flex.getCellData(r,c)==true){
                //     cell.className += ' active';
                // };
            }
        };


        function __cbListener(e) {
            e.stopPropagation();

            self.multiSelectPanelObj.flex.beginUpdate();
            for (var i = 0; i < self.multiSelectPanelObj.flex.rows.length; i++) {
                self.multiSelectPanelObj.flex.setCellData(i, self.multiSelectPanelObj.c, self.multiSelectPanelObj.cb.checked);
            }
            self.multiSelectPanelObj.flex.endUpdate();
            self.multiSelect(self.multiSelectPanelObj.cb.checked);
        }
        function __customCBListener(e) {
            e.stopPropagation();

            self.multiSelectPanelObj.flex.beginUpdate();

            if (angular.element(e.target).hasClass('active') || angular.element(e.target).hasClass('indeterminate')) {
                self.multiSelectPanelObj.cb.checked = false;
            } else {
                self.multiSelectPanelObj.cb.checked = true;
            }

            for (var i = 0; i < self.multiSelectPanelObj.flex.rows.length; i++) {
                self.multiSelectPanelObj.flex.setCellData(i, self.multiSelectPanelObj.c, self.multiSelectPanelObj.cb.checked);
            }
            self.multiSelectPanelObj.flex.endUpdate();
            self.multiSelect(self.multiSelectPanelObj.cb.checked);
        }
        function __cellListener(e) {
            // $scope.sortingColumn(flex, {
            //     col: col.index
            // });
            //$scope.ctx.flexGrid.autoSizeColumns();
        }
        this.multiSelect = function (checked) {
            $rootScope.$broadcast(ON_MULTI_SELECT, {
                checked: checked
            });
        }
        this.onMultiSelect = function ($scope, handler) {
            $scope.$on(ON_MULTI_SELECT, function (event, message) {
                handler(message);
            });
        }


        this.updateFlexGridRowHeight = function (grid, height) {
            height = height || 48;
            grid.rows.defaultSize = height;
            var headerHeight = 48;
            for (var i = 0, total = grid.columnHeaders.rows.length; i < total; i++) {
                grid.columnHeaders.rows[i].height = headerHeight;
            }
        };

        this.setUpRowHeader = function (panel, r, c, cell) {
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.style.textAlign = 'right';
                cell.textContent = (r + 1).toString();
            }
        };
        this.initFilters = function (grid, gridFilter, filteredCols) {
            if (!gridFilter) {
                gridFilter = new wijmo.grid.filter.FlexGridFilter(grid);
                // gridFilter.filterColumns = filteredCols;
                // grid.autoSizeColumns();
                self.toggleFilter(false, gridFilter, filteredCols);
            }
            return gridFilter;
        };
        this.setUpActions = function (panel, r, c, cell, header) {
            var col = panel.columns[c];
            if (col.header === header) {
                cell.className += " cell-actions";
            }
        };
        this.addClassToColumnByHeader = function (panel, r, c, cell, header, className) {
            var col = panel.columns[c];
            if (col.header === header) {
                cell.className += " " + className;
            }
        };
        this.addClassToColumnByBinding = function (panel, r, c, cell, binding, className) {
            var col = panel.columns[c];
            if (col.binding === binding) {
                cell.className += " " + className;
            }
        };

        this.setUpColumnVisibility = function (flex, colBindings, colNum) {
            if (flex && colBindings.length > 0) {
                var columnBindingsToggle = [];
                var columnVis = {};
                // var colBindings = Object.keys(data[0]);
                var ttl = colBindings.length;
                var cols = colNum ? colNum : 5;
                var rows = Math.ceil(ttl / cols);
                var count = 0;
                for (var i = 0; i < cols; i++) {
                    columnBindingsToggle[i] = [];
                    for (var j = 0; j < rows; j++) {
                        columnBindingsToggle[i][j] = colBindings[count];
                        count++;
                        if (count >= ttl) {
                            break;
                        }
                    }
                }
                for (var i = 0; i < colBindings.length; i++) {
                    columnVis[colBindings[i].binding] = true;
                }
                return {
                    columnBindingsToggle: columnBindingsToggle,
                    columnVis: columnVis
                }
            }
        }

        this.toggleFilter = function (filtersHidden, gridFilter, filteredCols) {
            //if flexgrid available
            if (gridFilter) {
                //get FlexGridFilter, defined in initGrid
                var f = gridFilter;
                if (f) {
                    //if filters are hidden, clear the grid filter
                    if (filtersHidden) {
                        f.clear();
                    }
                    //iterate through columns to filtered
                    for (var i = 0, il = filteredCols.length; i < il; i++) {
                        //get column and column filter
                        var col = f.grid.columns.getColumn(filteredCols[i].binding),
                            cf = col ? f.getColumnFilter(col, true) : {};
                        //switch filterType to 0 if filters hidden, otherwise to filterType defined in model
                        cf.filterType = filtersHidden ? 0 : filteredCols[i].filterType;
                    }

                }
                //refresh grid
                f.grid.refresh();
            }

        }


    }
})();