/**
 * Bento Datatable NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @author David Owen <david.owen@thomsonreuters.com>
 * @version 0.1.2
 * @date 10-/2014
 * @info
 * useful references: http://datatables.net/reference/index
 *
 * Changelog:
 *
 * 17/6/2014
 *  - using Controller instead of link for better code injections
 *  - using $watchCollection instead of $watch for scope.itemSource for better array watch
 *  - $compile `undefined` error is fixed when scope.page is not set
 *  - console.log is changed to $log.debug
 *  - minor code cleaning
 *
 *
 *
 * 20/10/2014
 *  - Add row details
 *  - Add scrollY ability via adding template with div wrapper to directive
 *  - Removed Controller, moved DOM manipulations back to Link.
 *  - Compile scope of tbody is now $scope.$parent to allow controller access
 *  - Refactored itemSource watch
 *  - convert all DataTable calls to the new 1.10 API
 *  - tableCreated method of accessing dataTable jQuery object differently (see client-side demo.js)
 *
 *
 *
 * 26/01/2015
 *  - Make compatible with Angular 1.3 - remove any DOM elements being returned in callback functions
 */

(function(angular, undefined) {
    'use strict';

    angular.module('bento.datatable', [])
        .directive('bentoDatatable', [
            '$timeout',
            '$log',
            '$compile',
            '$window',
            function($timeout, $log, $compile, $window) {
                return {
                    restrict: 'A',
                    scope: {
                        itemSource: '=',
                        columnDefinitions: '=',
                        selectedItems: '=',
                        multiSelectedItems: '=',
                        rowClicked: '&',
                        rowDblclicked: '&',
                        headerClicked: '&',
                        actionClicked: '&',
                        checkboxClicked: '&',
                        headerCheckboxClickState: '=',
                        tableCreated: '&',
                        page: '=',
                        itemsPerPage: '=',
                        searchTerm: '=',
                        totalItems: '=',
                        columnFilterDefinitions: '=',
                        columnFilterToggle: '=',
                        tableDrawn: '&',
                        rowDetailsTemplate: '=',
                        getExternalScopes: '&?externalScopes' //optional functionwrapper around any needed external scope instances
                    },
                    template: '<div><table></table></div>',
                    replace: true,
                    link: function(scope, element, attrs) {
                        //sort neutral datables plugin
                        //http://datatables.net/plug-ins/api/fnSortNeutral
                        jQuery.fn.dataTableExt.oApi.fnSortNeutral = function(oSettings) {
                            oSettings.aaSorting = [];
                            oSettings.aiDisplay.sort(function(x, y) {
                                return x - y;
                            });
                            oSettings.aiDisplayMaster.sort(function(x, y) {
                                return x - y;
                            });
                            oSettings.oApi._fnReDraw(oSettings);
                        };

                        // Default the grid editability to false.
                        var isEditable = false;
                        var isServerSide = true;
                        var currentPage = 1;
                        var hasMultiSelect = (attrs.multiSelectedItems !== undefined && attrs.multiSelectedItems.length > 0) ? true : false;
                        // If the directive specifies edit mode, then capture this.
                        if (attrs.isRowEditable) {
                            isEditable = scope.$eval(attrs.isRowEditable);
                        }

                        if (attrs.serverSideData) {
                            isServerSide = attrs.serverSideData;
                        }

                        // Store the DataTable options in the scope, use defaults if none specified by user
                        scope.dataTableOptions = {};

                        // Check the table attributes and apply any column definitions found.
                        if (attrs.datatableOptions !== undefined && attrs.datatableOptions.length > 0) {
                            scope.dataTableOptions = scope.$parent.$eval(attrs.datatableOptions);
                        } else {
                            scope.dataTableOptions = {
                                'autoWidth': false,
                                'stateSave': false,
                                'paginate': false,
                                'deferRender': true,
                                'filter': false,
                                'destroy': false,
                                'processing': true,
                                'ordering': false,
                                'order': [
                                    [0, 'asc']
                                ],
                                'dom': '<"top">rt<"bottom"f><"clear">SR'
                            };
                        }

                        /**
                         * Check if scrollY option is turned on
                         * If so, watch width when window resize
                         */
                        if (scope.dataTableOptions.scrollY) {
                            scope.$watch(
                                function() {
                                    return element.width();
                                },
                                function(newValue, oldValue) {
                                    if (newValue !== oldValue) {
                                        resizeColumnHeaders();
                                    }
                                }
                            );

                            angular.element($window).bind('resize', function() {
                                scope.$apply();
                            });
                        }

                        /**
                         * Check if rowCallback option exists and add method to function
                         * to compile individual row when created
                         */
                        scope.dataTableOptions.rowCallback = (function() {
                            var cached_function = scope.dataTableOptions.rowCallback;
                            return function(row, data) {
                                if (cached_function) {
                                    //if function exists, call it first
                                    cached_function(row, data);
                                }
                                //compile row to scope for ng-clicks 
                                //and any other directives like tooltips
                                var rowEl = angular.element(row);
                                if (!rowEl.hasClass('compiled')) {
                                    rowEl.addClass('compiled');
                                    $compile(row)(scope);
                                }
                            }
                        }());

                        var startSortColumn = scope.dataTableOptions.order[0] ? (scope.dataTableOptions.order[0][0] ? scope.dataTableOptions.order[0][0] : -1) : -1,
                            selectedColumnIndex,
                            isColumnClicked = false,
                            isColumnInitialized = false,
                            isTableCreated = false;
                        // Check for any declared columns and apply any found.
                        var declarativeColumns = [];
                        // Look for columns defined with th elements.
                        // TODO: This doesn't appear to work. No TH elements are found.
                        // Apparently, because of the presence of the full jquery library the directive is returning
                        // the function that returns the table in the element. Not the table itself. Investigation pending.
                        element.find('th').each(function(index, elem) {
                            declarativeColumns.push($(elem).text());
                        });

                        // If any TH elements were found, store them in the aoColumns property of the DataTable.
                        if (declarativeColumns.length > 0) {
                            scope.dataTableOptions.columns = declarativeColumns;
                            // Otherwise, check for columns declared in the aoColumns attribute and apply them.
                        }
                        // else if (scope.columnDefinitions) {
                        //     scope.dataTableOptions.columns = scope.columnDefinitions;
                        // }

                        //if not server side, listen to page and itemsPerPage
                        if (isServerSide === 'false') {
                            scope.$watch('page', function(pg) {
                                if (scope.DataTable) {
                                    currentPage = pg - 1;
                                    scope.DataTable.page(currentPage).draw(false);
                                }
                            });

                            scope.$watch('itemsPerPage', function(d) {
                                if (scope.DataTable) {
                                    scope.DataTable.page.len(d).draw();
                                }
                            });

                            scope.$watch('searchTerm', function(term) {
                                if (scope.DataTable) {
                                    var termStr = String(term);
                                    scope.dataTable.api().search(termStr).draw();
                                }
                            });
                        }

                        if (attrs.headerCheckboxClickState) {
                            scope.$watch('headerCheckboxClickState', function(state) {
                                if (state === true) {
                                    selectAllItems();
                                } else if (state === false) {
                                    deselectAllItems();
                                }
                            });
                        }

                        if (attrs.columnDefinitions !== undefined) {
                            scope.$watch('columnDefinitions', function() {
                                    updateColumns();
                                },
                                true);
                        }
                        /**
                         * watch selected items
                         */
                        scope.$watchCollection('selectedItems', function() {
                            if (scope.selectedItems !== undefined) {
                                checkForSelectedItems(true);
                            }
                        });
                        // Click Handler Function.
                        scope.editClickHandler = function(el) {
                            var $tr = $(el).closest('tr');
                            // Retrieve the data context for the edited row.
                            var dataContext = scope.DataTable.row($tr).data();
                            // Apply the editing template to the newly selected row.
                            applyEditTemplate($tr, dataContext);
                            // Store the current row as the selected row.
                            scope.editRow = $tr;
                        };

                        scope.saveClickHandler = function(el) {
                            //$log.debug('save');
                        };

                        scope.actionsClickHandler = function(el) {
                            var $tr = el.closest('tr'),
                                action = el.data('action'),
                                dataContext = scope.DataTable.row($tr).data();
                            scope.actionClicked({
                                action: action,
                                rowData: dataContext
                            });
                        };

                        //show Row Details
                        //http://www.datatables.net/examples/api/row_details.html
                        scope.showRowDetails = function(el) {
                            if (!attrs.rowDetailsTemplate) {
                                return;
                            }
                            var $tr = el.closest('tr'),
                                row = scope.DataTable.row($tr);

                            if (row.child.isShown()) {
                                row.child.hide();
                                $tr.removeClass('shown');
                            } else {
                                row.child(scope.rowDetailsTemplate(row.data())).show();
                                $tr.addClass('shown');
                            }
                        };
                        scope.headerCheckboxHandler = function(el) {
                            if (el[0].checked) {
                                selectAllItems();
                            } else {
                                deselectAllItems();
                            }
                        };
                        scope.checkboxHandler = function(el, changeEvent) {
                            //deselect header checkbox by default
                            $('thead tr input:checkbox', element).prop('checked', false);
                            if (attrs.headerCheckboxClickState) {
                                scope.headerCheckboxClickState = 'indeterminate';
                            }

                            //if no unique column specified, exit
                            if (!attrs.uniqueKey) {
                                return;
                            }
                            //if selectedItems not defined, create as array
                            if (scope.selectedItems === undefined) {
                                scope.selectedItems = [];
                            }
                            //get row element reference and checked status
                            var $tr = el.closest('tr'),
                                isChecked = el[0].checked;

                            var dataContext = scope.DataTable.row($tr).data();

                            //get unique value from source
                            var uniqueID = getUniqueID($tr);
                            //get index of unique value in selected items array, if any
                            var itemIndex = scope.selectedItems.indexOf(uniqueID);

                            //if item exists and checkbox is deselected, remove item from array
                            if (itemIndex > -1 && !isChecked) {
                                scope.selectedItems.splice(itemIndex, 1);
                            }
                            //if item doesn't exist in array and checkbox selected, add item to array
                            else if (itemIndex < 0 && isChecked) {
                                scope.selectedItems.push(uniqueID);
                            }

                            if (attrs.checkboxClicked) {
                                scope.checkboxClicked({
                                    rowData: dataContext,
                                    isChecked: isChecked,
                                    changeEvent: changeEvent,
                                });
                            }

                        };
                        scope.rowClickHandler = function(row, clickEvent) {
                            // Retrieve the index of the clicked Row.
                            var dataContext = scope.DataTable.row(row).data();
                            // Do not attempt to apply edit mode to the header row.
                            if ($(row).parent('thead').length > 0) {
                                return;
                            }

                            var isSelected = $(row).hasClass('selected');

                            if (hasMultiSelect) {


                                //get unique value from source
                                var uniqueID = getUniqueID(row);
                                //get index of unique value in selected items array, if any
                                var itemIndex = scope.multiSelectedItems.indexOf(uniqueID);
                                //if item exists and checkbox is deselected, remove item from array
                                if (itemIndex > -1) {
                                    scope.multiSelectedItems.splice(itemIndex, 1);
                                    $(row).removeClass('selected');
                                }
                                //if item doesn't exist in array and checkbox selected, add item to array
                                else if (itemIndex < 0) {
                                    scope.multiSelectedItems.push(uniqueID);
                                    $(row).addClass('selected');
                                }
                            } else {
                                if (isSelected) {
                                    //Might not need to remove Class until the an another row is selected
                                    //$(row).removeClass('selected');
                                } else {
                                    $('tr.selected', element).removeClass('selected');
                                    $(row).addClass('selected');
                                }
                            }
                            // Call the specified controller function.
                            // Convert the rowParameter to the actual row context.

                            //var dataContext = scope.itemSource[rowIndex];

                            if (attrs.rowClicked) {
                                scope.rowClicked({
                                    rowElement: row,
                                    rowParameter: row,
                                    rowData: dataContext,
                                    clickEvent: clickEvent
                                });
                            }

                            // Edit Code. Do not allow editing the header row.
                            if (isEditable === true) {
                                // If a row was already being edited, then remove edit template and selection class.
                                if (scope.editRow) {

                                    // Do not attempt to apply the edit template on the same row that is being edited.
                                    if (row.index() === scope.editRow.index()) {
                                        return;
                                    }

                                    // Retrieve the data context for the edited row.
                                    var editedDataContext = scope.DataTable.row(scope.editRow).data();

                                    // Validate the row.
                                    if (validateRowChanges(row, dataContext)) {
                                        return;
                                    }

                                    // Convert the row back to read only.
                                    commitRowChanges(scope.editRow, editedDataContext);

                                    // Save the row.
                                    updateRowDataContext(scope.editRow, editedDataContext);

                                    // Remove the selected row styling.
                                    scope.editRow.removeClass('row_selected');
                                }

                                // Apply the selection class to the newly selected row.
                                row.addClass('row_selected');

                                // Retrieve the data context for the edited row.
                                dataContext = scope.DataTable.row(row).data();

                                // Apply the editing template to the newly selected row.
                                applyEditTemplate(row, dataContext);

                                // Store the current row as the selected row.
                                scope.editRow = row;
                            }
                        };

                        // DoubleClick Handler Function.
                        scope.rowDoubleClickHandler = function(row, clickEvent) {
                            var dataContext = scope.DataTable.row(row).data();
                            scope.rowDblclicked({
                                rowElement: row,
                                rowParameter: row,
                                rowData: dataContext,
                                clickEvent: clickEvent
                            });
                        };

                        scope.theadClickHandler = function(column, clickEvent) {
                            if ($(column[0]).hasClass('sorting_disabled')) {
                                return;
                            }
                            selectedColumnIndex = column.index();
                            isColumnClicked = true;
                            var direction = 'asc';

                            if ($(column[0]).hasClass('sorting_desc')) {
                                direction = 'asc';
                            }
                            if ($(column[0]).hasClass('sorting_asc')) {
                                direction = 'desc';
                            }
                            scope.headerClicked({
                                column: column[0].innerHTML,
                                columnObject: scope.columnDefinitions[selectedColumnIndex],
                                sortDirection: direction,
                                clickEvent: clickEvent
                            });
                        };

                        scope.onTableDraw = function() {
                            //deselect header checkbox by default
                            $('thead tr input:checkbox', element).prop('checked', false);
                            //compile again after dynamic content updated, such as tooltip
                            //checkRowGrouping();
                            if (scope.totalItems !== undefined) {
                                scope.totalItems = scope.DataTable.page.info().recordsDisplay;
                            }

                            scope.tableDrawn();

                            if (scope.dataTableOptions.scrollY) {
                                resizeColumnHeaders();
                            }

                            //$compile(element.contents())(scope);
                        };

                        /**** Directive Methods ***/
                        function addClickEvents() {
                            // Add the click handler to each TR element.
                            element.on('click', 'tr', function(event) {
                                var _this = this;
                                scope.$apply(function() {
                                    scope.rowClickHandler(_this, event);
                                });
                            });

                            // Add the double click handler to each TR element.
                            element.on('dblclick', 'tr', function(event) {
                                scope.rowDoubleClickHandler(this, event);
                            });

                            // Add the click event to the thead area.
                            // $("thead td").click(function() {} );
                            //$(scope.dataTable).on("click", "thead td", function(event){

                            element.on('click', 'thead th', function(event) {

                                //if data is server side
                                if (isServerSide !== 'false' && $(this).index() >= startSortColumn) {
                                    scope.DataTable.clear().draw();
                                    showEmptyTableText();
                                }
                                scope.theadClickHandler($(this, event));
                            });

                            // ADD edit and save click handler
                            // $(scope.dataTable).on("click", "tr .edit", function(event){
                            //     scope.editClickHandler($(this));
                            // });
                            // $(scope.dataTable).on("click", "tr .save", function(event){
                            //     scope.saveClickHandler($(this));
                            // });
                            element.on('click', 'tr [data-action]', function(event) {
                                event.stopPropagation();
                                scope.actionsClickHandler($(this, event));
                            });
                            element.on('click', 'tr [data-show-row-details]', function() {
                                scope.showRowDetails($(this));
                            });
                            element.on('change', 'tbody tr input:checkbox', function(event) {
                                var _this = this;
                                scope.$apply(function() {
                                    scope.checkboxHandler($(_this), event);
                                });
                            });
                            element.on('click', 'tbody tr input:checkbox', function(event) {
                                event.stopPropagation();
                            });
                            element.on('change', 'thead:eq(0) tr input:checkbox', function() {
                                var _this = this;
                                scope.$apply(function() {
                                    scope.headerCheckboxHandler($(_this));
                                });
                            });

                            element.on('draw.dt', function() {
                                scope.onTableDraw();
                            });

                            element.on('order.dt', function() {
                                //if filter events, change page number
                                if (!!scope.page) {
                                    $timeout(function() {
                                        scope.page = scope.DataTable.page.info().page + 1;
                                    });
                                } else {
                                    $log.warn('Bento DataTable - `page` is not defined');
                                }
                                //$log.debug(scope.DataTable.page.info())
                            });
                        }

                        /**
                         * Add in column group header if needed
                         */
                        function addColumnGroupHeader() {
                            if (attrs.columnGrouping === 'true' && attrs.columnDefinitions) {

                                var groupTitle = '';
                                var colSpan = 1;
                                //get column head
                                element.find('thead tr').before('<tr role="row"></tr>');
                                var theadRow = element.find('thead tr:eq(0)');
                                var originalTheadRow = element.find('thead tr:eq(1)');
                                var appendCount = 0;
                                //iterate through all the columns
                                for (var i = 0, total = scope.columnDefinitions.length; i < total; i++) {
                                    var $col = originalTheadRow.children().eq(i - appendCount);

                                    if (scope.columnDefinitions[i].groupTitle === null || scope.columnDefinitions[i].groupTitle === undefined) {

                                        $col.appendTo(theadRow);

                                        if (i > 0 && scope.columnDefinitions[i - 1].groupTitle !== null && scope.columnDefinitions[i - 1].groupTitle !== undefined) {
                                            $col.addClass('group');
                                        }
                                        $col.attr('rowspan', 2);
                                        appendCount += 1;

                                    } else if (scope.columnDefinitions[i].groupTitle !== groupTitle) {

                                        groupTitle = scope.columnDefinitions[i].groupTitle;
                                        colSpan = 1;
                                        theadRow.append('<th colspan="' + colSpan + '" class="group">' + groupTitle + '</th>');
                                        $col.addClass('group');

                                    } else {

                                        colSpan += 1;
                                        $('th:last-child', theadRow).remove();
                                        theadRow.append('<th colspan="' + colSpan + '" class="column-group group">' + groupTitle + '</th>');
                                    }

                                }
                            }
                        }
                        /**
                         * Add in column filter if needed
                         * https://datatables.net/examples/api/multi_filter.html
                         */
                        function addColumnFilters() {
                            if (scope.columnFilterDefinitions && scope.columnFilterDefinitions.length > 0) {
                                //Add another thead after original thead
                                var thead = element.find('thead:eq(0)');
                                var tHeadHTML = '<thead class="column-filter-row"><tr></tr></thead>';
                                $(thead).after(tHeadHTML);
                                var $columnFilterRow = element.find('.column-filter-row tr');

                                //Iterate throught column filter definitions
                                for (var i = 0, total = scope.columnFilterDefinitions.length; i < total; i++) {
                                    var filterObj = scope.columnFilterDefinitions[i];
                                    //var randomName = Math.round(Math.random()*100000);
                                    var modelName = 'cf_model_' + i;

                                    //If filter is input type, create input field and bind keyup and change event to it
                                    if (filterObj.type && filterObj.type === 'input') {
                                        $columnFilterRow.append('<th><input ng-model="' + modelName + '" ng-change="filterColumn(' + i + ', ' + modelName + ',' + filterObj.exactMatch + ')" type="text" /></th>');
                                    }
                                    //Else if filter is select type, create select field and bind select event to it
                                    else if (filterObj.type && filterObj.type === 'select') {
                                        // var selectHTML = '<th><select ng-model="' + modelName + '" ng-change="filterColumn('+ i +', '+ modelName +')" '
                                        //                + 'ng-options="option.value as option.name for option in columnFilterDefinitions[' + i + '].options"' 
                                        //                + '></select></th>';

                                        var selectHTML = '<th><select ng-model="' + modelName + '" ng-change="filterColumn(' + i + ', ' + modelName + ',' + filterObj.exactMatch + ')">';
                                        for (var j = 0, ttl = filterObj.options.length; j < ttl; j++) {
                                            selectHTML += '<option value="' + filterObj.options[j].value + '">' + filterObj.options[j].name + '</option>';
                                        }
                                        selectHTML += '</select></th>';
                                        $columnFilterRow.append(selectHTML);
                                    }
                                    //Else add empty cell
                                    else {
                                        $columnFilterRow.append('<th></th>');
                                    }
                                }

                                scope.$watch('columnFilterToggle', function(showOrHide) {
                                    $('.column-filter-row', element).toggle(showOrHide);
                                });

                                //column header element compiled on table created

                            }
                        }

                        function updateColumns() {
                            var columns = scope.columnDefinitions;
                            if (columns && columns.length > 0 && scope.DataTable) {
                                // column visibility and column grouping aren't playing
                                // nice together so kill this feature for datatables
                                // that have column groups
                                if (attrs.columnGrouping === "true") {
                                    return;
                                }
                                columns.forEach(function(col, i) {
                                    // set each columns visibility
                                    scope.DataTable.column(i).visible(col.visible);
                                    // ensure we have column filters before trying to hide them
                                    if (typeof scope.columnFilterDefinitions !== 'undefined') {
                                        // set each filters visiblity
                                        var css = (col.visible === false) ? "none" : "table-cell";
                                        var fauxIndex = i + 1;
                                        var el = element[0].querySelector('.column-filter-row th:nth-of-type(' + fauxIndex + ')');
                                        // set the display property to show/hide filters    
                                        if (el) {
                                            el.style.display = css;
                                        }
                                    }

                                });
                            }
                        }

                        function resizeColumnHeaders() {
                            if (scope.DataTable) {
                                scope.DataTable.columns.adjust();
                            }
                        }
                        /**
                         * @desc adds back sort arrows when using server-side data
                         * and client-side sorting is disabled
                         * @param index
                         */
                        function displaySortColumn(index) {
                            if (!isTableCreated || (isColumnInitialized && !isColumnClicked)) {
                                return;
                            }

                            isColumnClicked = false;
                            isColumnInitialized = true;


                            var tmp = $('thead th', element),
                                tmpLength = tmp.length;

                            for (var i = 0; i < tmpLength; i = i + 1) {
                                var columnDef = scope.columnDefinitions[i];
                                if (columnDef && (columnDef.bSortable === false || columnDef.sortable === false)) {
                                    continue;
                                }
                                var addClassName = 'sorting';
                                if (index === i) {
                                    if (tmp[i].className === 'sorting_desc') {
                                        addClassName = 'sorting_asc';
                                    } else if (tmp[i].className === 'sorting_asc') {
                                        addClassName = 'sorting_desc';
                                    } else {
                                        if (tmp[i].className === 'sorting_disabled') {
                                            if (scope.dataTableOptions.order[0][1] === 'asc') {
                                                addClassName = 'sorting_asc';
                                            } else {
                                                addClassName = 'sorting_desc';
                                            }
                                        } else {
                                            addClassName = 'sorting_asc';
                                        }
                                    }
                                }
                                $(tmp[i]).attr('aria-controls', element.attr('id'));
                                $(tmp[i]).removeClass();
                                $(tmp[i]).addClass(addClassName);
                                if (addClassName === 'sorting_asc') {
                                    $(tmp[i]).attr('area-sort', 'ascending');
                                } else if (addClassName === 'sorting_desc') {
                                    $(tmp[i]).attr('area-sort', 'descending');
                                } else if (addClassName === 'sorting') {
                                    $(tmp[i]).removeAttr('area-sort');
                                }
                            }
                        }

                        function applyEditTemplate(row, rowDataContext) {

                            // Extract all the cells from the row.
                            var rowCells = $('>td', row);
                            var editCells = [];

                            // Insert a text box in each row using the data context as the value source.
                            for (var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {

                                var columnDef = scope.columnDefinitions[cellCounter];
                                var cellDataContext = null;

                                if (columnDef.mData) {
                                    cellDataContext = rowDataContext[columnDef.mData];
                                } else {
                                    cellDataContext = rowDataContext[cellCounter];
                                }

                                editCells[cellCounter] = '<td><div class="control-group"><input type="text" value="' + cellDataContext + '"></div></td>';
                            }

                            // Apply the edit cell Html.
                            $(row).html(editCells);

                            //MH note: sorting causes targeting issues and generally makes everything more complicated so clear sorting filters
                            //scope.dataTable.fnSort([]);

                            // Redraw the table.
                            scope.DataTable.sort().draw();
                        }

                        function commitRowChanges(row, dataContext) {

                            //var rowIndex = row.index();

                            // Extract all the cells from the row.
                            var rowCells = $('>td', row);

                            // Extract all the inputs
                            //var textControls = $('input', row);

                            // Update each cell in the DataTable row to commit the change to the table and restore the row template.
                            for (var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                                //scope.dataTable.fnUpdate(textControls[cellCounter].value, rowIndex, cellCounter, false);
                            }
                        }

                        function updateRowDataContext(row, dataContext) {

                            // Extract all the cells from the row.
                            var rowCells = $('>td', row);

                            // Update each property in the data context from it's cell.
                            for (var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                                //dataContext[cellCounter] = scope.dataTable.fnGetData(rowCells[cellCounter]);
                            }
                        }

                        function validateRowChanges(row, dataContext) {
                            var errors = false;
                            //var rowIndex = row.index();


                            // Extract all the cells from the row.
                            //var rowCells = $('>td', row);

                            // Extract all the inputs
                            var textControls = $('input', row);

                            angular.forEach(textControls, function(textControl) {
                                if (textControl.value === '') {
                                    errors = true;
                                    $(textControl).parent().addClass('error');
                                } else {
                                    $(textControl).parent().removeClass('error');
                                }
                            });

                            return errors;
                        }

                        function selectAllItems() {
                            if (!scope.DataTable) {
                                return;
                            }
                            if (scope.selectedItems === undefined) {
                                scope.selectedItems = [];
                            }
                            $('tbody tr', element).each(function() {
                                //get unique id from row, attrs.uniqueKey is the keyname of the column
                                var uniqueID = getUniqueID(this);
                                //check if unique id does not exist in array of selected items
                                if (scope.selectedItems.indexOf(uniqueID) < 0) {
                                    //select the checkbox
                                    //add to list
                                    var $checkbox = $('input:checkbox', this);
                                    if ($checkbox.length) {
                                        $checkbox.prop('checked', true);
                                        scope.selectedItems.push(uniqueID);
                                    }
                                }
                            });
                        }

                        function deselectAllItems() {
                            if (!scope.DataTable) {
                                return;
                            }
                            if (scope.selectedItems === undefined) {
                                scope.selectedItems = [];
                            }
                            $('tbody tr', element).each(function() {
                                //get unique id from row, attrs.uniqueKey is the keyname of the column
                                var uniqueID = getUniqueID(this);
                                //check if unique id does not exist in array of selected items
                                var itemIndex = scope.selectedItems.indexOf(uniqueID);
                                if (itemIndex > -1) {
                                    //deselect the checkbox
                                    //remove from list
                                    var $checkbox = $('input:checkbox', this);
                                    if ($checkbox.length) {
                                        $checkbox.prop('checked', false);
                                        scope.selectedItems.splice(itemIndex, 1);
                                    }
                                }
                            });
                        }

                        function checkForSelectedItems(force) {
                            //Multi-Select: check to see if any items are selected when data is updated
                            //if there are items in the array
                            if (scope.selectedItems.length > 0 || force === true) {
                                //iterate through all the row item source and check if unique id is in selected array
                                $('tbody tr', element).each(function() {
                                    //get unique id from row, attrs.uniqueKey is the keyname of the column
                                    var uniqueID = getUniqueID(this);
                                    //check if unique id exists in array of selected items
                                    if (scope.selectedItems.indexOf(uniqueID) > -1) {
                                        //select the checkbox
                                        $('input:checkbox', this).prop('checked', true);
                                    } else {
                                        $('input:checkbox', this).prop('checked', false);
                                        $('input:checkbox', 'thead tr').prop('checked', false);
                                    }
                                });
                            }
                        }

                        function checkForMultiSelectedItems() {
                            //Multi-Select: check to see if any items are selected when data is updated
                            //if there are items in the array
                            if (scope.multiSelectedItems.length > 0) {
                                //iterate through all the row item source and check if unique id is in selected array
                                $('tbody tr', element).each(function() {
                                    //get unique id from row, attrs.uniqueKey is the keyname of the column
                                    var uniqueID = getUniqueID(this);
                                    //check if unique id exists in array of selected items
                                    if (scope.multiSelectedItems.indexOf(uniqueID) > -1) {
                                        //select the checkbox
                                        //$('input:checkbox', this).prop("checked", true);
                                    }
                                });
                            }
                        }

                        function getUniqueID(row) {
                            var dataContext = scope.DataTable.row(row).data();
                            if (dataContext) {
                                return JSON.stringify(dataContext[attrs.uniqueKey]);
                            } else {
                                return -1;
                            }
                        }

                        function checkRowGrouping() {
                            if (attrs.groupByColumn !== undefined && isServerSide === 'false' && scope.DataTable) {
                                var col = Number(attrs.groupByColumn);
                                scope.dataTable.rowGrouping({
                                    iGroupingColumnIndex: col,
                                    bExpandableGrouping: true,
                                    asExpandedGroups: [],
                                    fnOnGrouped: function() {}
                                });
                            }
                        }

                        function showEmptyTableText() {
                            //scope.dataTable.fnSettings().oLanguage.sEmptyTable = '';
                            //scope.dataTable.fnSettings().oLanguage.sZeroRecords = '';
                        }

                        //http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
                        function escapeRegExp(str) {
                            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        }

                        scope.filterColumn = function(index, value, isSelect) {
                            if (isSelect) {
                                var val = escapeRegExp(value);
                                // if($.fn.dataTable.util){
                                //     val = $.fn.dataTable.util.escapeRegex(value);
                                // }
                                scope.DataTable
                                    .column(index)
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            } else {
                                scope.DataTable
                                    .column(index)
                                    .search(value)
                                    .draw();
                            }
                        };

                        /**** Directive Watches ***/

                        // Set a watch on the DataTable's data element and rebuild the table if it changes.
                        scope.$watchCollection('itemSource', function(newValue, oldValue) {
                            if (scope.columnDefinitions === undefined || scope.columnDefinitions.length === 0) {
                                return;
                            }

                            // If the Data Table has not already been created..
                            if (typeof scope.DataTable === 'undefined') {
                                // Examine the data to see if it has any content. If it doesn't,
                                // then the watch is in it's start up execution.

                                // Retrieve the column information defined in the datatable declaration.
                                // This data should now be present if it was delivered in the data call.

                                //if client side data
                                if (isServerSide === 'false') {
                                    currentPage = scope.page - 1;
                                    scope.dataTableOptions.paginate = true;
                                    scope.dataTableOptions.ordering = true;
                                    scope.dataTableOptions.displayLength = scope.itemsPerPage;
                                    scope.dataTableOptions.displayStart = currentPage * scope.itemsPerPage;
                                }

                                if (attrs.columnDefinitions === undefined || (Array.isArray(scope.columnDefinitions) && scope.columnDefinitions.length === 0)) {
                                    scope.dataTableOptions.columns = [];
                                    angular.forEach(newValue, function(value, key) {
                                        scope.dataTableOptions.columns.push({
                                            'data': key,
                                            'title': key,
                                        });
                                    });
                                } else {
                                    scope.dataTableOptions.columns = scope.columnDefinitions;
                                }

                                // Apply the DataTable plugin to the specified element and pass the various options
                                // captured above in as the options parameter..

                                //jQuery Object reference
                                //TODO: switch to using DataTables 1.10 API
                                //DataTables API instance
                                scope.dataTable = $('table:eq(0)', element).dataTable(scope.dataTableOptions);
                                scope.DataTable = scope.dataTable.api();

                                // Add the newly delivered data to the table.
                                if (newValue.length === 0) {
                                    scope.DataTable.clear().draw();
                                    showEmptyTableText();
                                } else {
                                    scope.DataTable.rows.add(newValue).draw();
                                }
                                //add in group column header if needed
                                addColumnGroupHeader();

                                //Add Column Filters
                                addColumnFilters();

                                //Add Click Event Handlers
                                addClickEvents();

                                //Update Column Headers
                                updateColumns();

                                //row grouping
                                if (attrs.groupByColumn !== undefined) {
                                    checkRowGrouping();
                                    //scope.DataTable.draw();
                                }

                                //option to expose dataTable object after it is created
                                scope.tableCreated({
                                    dataTableAPI: scope.DataTable
                                });
                                isTableCreated = true;


                                //compile column headers
                                $compile($('thead', element))(scope);

                                //$compile(element.contents())(scope);

                            } else {
                                // Otherwise, refresh the datatable with the new data.
                                var val = newValue || null;

                                // Remove the current data from the table.
                                scope.DataTable.clear().draw();

                                if (val && val.length > 0) {

                                    if (scope.editRow) {
                                        scope.editRow = undefined;
                                    }

                                    // Add the newly delivered data to the table.
                                    //scope.dataTable.fnAddData(newValue);
                                    scope.DataTable.rows.add(newValue).draw();

                                    //$log.debug('Render time = ' + (endTime - startTime) + 'ms');
                                } else {
                                    showEmptyTableText();
                                }
                            }

                            //if client sort turned off and aoColumns available
                            //add sort arrows manually
                            if (!scope.dataTableOptions.ordering && scope.dataTableOptions.aoColumns && isServerSide !== 'false') {
                                //if column was not clicked, start sort with original sort column
                                if (!selectedColumnIndex) {
                                    selectedColumnIndex = startSortColumn;
                                }
                                if (selectedColumnIndex >= 0) {
                                    displaySortColumn(selectedColumnIndex);
                                } else {
                                    startSortColumn = 0;
                                }
                            }
                            //Multi-Select: check to see if any items are selected when data is updated
                            //check if attribute exists for array of selected items
                            if (scope.selectedItems !== undefined &&
                                scope.selectedItems.length > 0 &&
                                attrs.uniqueKey !== undefined && !!scope.itemSource &&
                                scope.itemSource.length > 0
                            ) {
                                checkForSelectedItems();
                            }
                            //Multi-Select: check to see if any items are selected when data is updated
                            //check if attribute exists for array of selected items
                            if (scope.multiSelectedItems !== undefined &&
                                scope.multiSelectedItems.length > 0 &&
                                attrs.uniqueKey !== undefined && !!scope.itemSource &&
                                scope.itemSource.length > 0
                            ) {
                                checkForMultiSelectedItems();
                            }

                        });

                    }
                };
            }
        ]);
})(window.angular);