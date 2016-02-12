'use strict';

angular.module('app').controller('BentoController', BentoController);

BentoController.$inject = ['$scope', '$log', '$timeout', 'flexGridSetUpService', '$locale', 'dataService'];
function BentoController($scope, $log, $timeout, flexGridSetUpService, $locale, dataService) {
    var vm = this;

    //var busyLoader2 = $bentoBusyLoader.getNewLoader($element);
    vm.isLoader1Busy = false;
    vm.message = 'Status';

    vm.cboTextChanged = function (sender, args) {
        //debugger;
    };

    vm.testButtonClicked = function () {
        //var cbo = angular.element('#cboTest');
        var val = $scope.cboTest;
        debugger;
    };

    // generate some random data
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i,
            order: 100 + i,
            date: new Date(2014, i % 12, i % 28),
            amount: Math.random() * 10000,
            active: i % 4 == 0
        });
    }

    // Dummy Data
    vm.flowers = [
      { id: 1, name: "Rose" },
      { id: 2, name: "Carnation" },
      { id: 3, name: "Lilly" },
      { id: 4, name: "Sunflower" },
      { id: 5, name: "Tulip" },
      { id: 6, name: "Peony" },
      { id: 7, name: "Poinsettia" },
      { id: 8, name: "Orchid" }
    ];

    // Feed Flower Array
    vm.getFlowers = function () {
        return vm.flowers;
    };
    vm.onComboboxChange = function (item) {
        $log.info('changed to', item);
    }

    // add data array to scope
    vm.data = data;

   

    $scope.ctx = {
        flexGrid: null,
        gridFilter: null,
        totalItems: 100,
        data: dataService.getData(100),
        includeColumnHeader: true,
        pageSize: 25,
        page: 1,
        language: "en",
        filteredCols: [{
            binding: 'selected',
            filterType: 0
        }, {
            binding: 'id',
            filterType: 0
        }, {
            binding: 'start',
            filterType: 3
        }, {
            binding: 'end',
            filterType: 3
        }, {
            binding: 'country',
            filterType: 3
        }, {
            binding: 'product',
            filterType: 3
        }, {
            binding: 'color',
            filterType: 3
        }, {
            binding: 'amount',
            filterType: 3
        }, {
            binding: 'amount2',
            filterType: 3
        }, {
            binding: 'discount',
            filterType: 3
        }, {
            binding: 'active',
            filterType: 3
        }],
        columnsToToggle: [{
            binding: 'ID',
            header: 'ID'
        }, {
            binding: 'start',
            header: 'Start'
        }, {
            binding: 'end',
            header: 'End'
        }, {
            binding: 'country',
            header: 'Country'
        }, {
            binding: 'product',
            header: 'Product'
        }, {
            binding: 'color',
            header: 'Color'
        }, {
            binding: 'amount',
            header: 'Amount'
        }, {
            binding: 'amount2',
            header: 'Amount 2'
        }, {
            binding: 'discount',
            header: 'Discount'
        }],
        shownFilters: [],
        columnBindings: null,
        columnBindingsToggle: null,
        columnVis: {},
        sort: {
            property: null,
            ascending: null
        },
        groupPanelHidden: true,
        filtersHidden: false,
        itemPerPageOptions: [{
            value: 10,
            label: 10
        }, {
            value: 25,
            label: 25
        }, {
            value: 50,
            label: 50
        }, {
            value: 100,
            label: 100
        }]
    }

    //Add filterObj for remaining columns
    for (var i = 0; i < 5; i++) {
        var filterObj = {
            binding: 'col' + i,
            filterType: 3
        }
        $scope.ctx.filteredCols.push(filterObj);
    }
    //Add column vis for remaining columns
    for (var i = 0; i < 5; i++) {
        var obj = {
            binding: 'col' + i,
            header: 'Col ' + i
        }
        $scope.ctx.columnsToToggle.push(obj);
    }
    $scope.ctx.columnBindings = Object.keys($scope.ctx.data[0]);

    $scope.onSelectionChanged = function (s, e) {
        //Get data from row selection
        var dataItem = s.rows[e.row].dataItem;
        console.log(dataItem);
    }
    $scope.onLoadedRows = function () {
        // if($scope.ctx.flexGrid){
        //     $scope.ctx.flexGrid.autoSizeColumns();
        // }
    }
    $scope.actions = {
        toggleFilter: function () {
            $scope.ctx.filtersHidden = !$scope.ctx.filtersHidden;
            flexGridSetUpService.toggleFilter($scope.ctx.filtersHidden, $scope.ctx.gridFilter, $scope.ctx.filteredCols);

            if ($scope.ctx.flexGrid) {
                $scope.ctx.flexGrid.autoSizeColumns();
            }
        },
        testAdd: function () {
            console.log('add');
        },
        editRow: function (item) {
            alert("Editing item: " + item.id + " from country: " + item.country);
        },
        attachRow: function (item) {
            alert("Attaching item: " + item.id + " from country: " + item.country);
        },
        toggleGroupPanel: function () {
            $scope.ctx.groupPanelHidden = !$scope.ctx.groupPanelHidden;
            if ($scope.ctx.flexGrid) {
                //update pointer coordinates so flexgrid is still clickable
                $scope.ctx.flexGrid.refresh();
            }
        },
        toggleVisibility: function (binding) {
            $scope.ctx.columnVis[binding] = !$scope.ctx.columnVis[binding];
        }
    }

    //Init Grid
    $scope.$watch('ctx.flexGrid', function (flex) {
        if (flex) {
            flex.autoSizeMode = 'Both';
            flex.autoSizeColumns();
            setUpFilters();
            //Set up locale
            flexGridSetUpService.setUpCulture();
            var colVisObj = flexGridSetUpService.setUpColumnVisibility(flex, $scope.ctx.columnsToToggle, 5);
            $scope.ctx.columnBindingsToggle = colVisObj.columnBindingsToggle;
            $scope.ctx.columnVis = colVisObj.columnVis;
            setUpPagination();
            updateFlexGridRenderMode();

        }
    });

    function setUpFilters() {
        $scope.ctx.gridFilter = flexGridSetUpService.initFilters($scope.ctx.flexGrid, $scope.ctx.gridFilter, $scope.ctx.filteredCols);
        $scope.ctx.flexGrid.autoSizeColumns();
        //Add Wijmo Event Listener to filterApplied
        $scope.ctx.gridFilter.filterApplied.addHandler(onFilterApplied);
    }

    function onFilterApplied(args) {
        console.log(args)
    }
    // cancel default sorting and use custom instead
    // this is for add 'is-sorted' class name to cell element
    // to accomodate icon treatment for filter dropdown
    $scope.sortingColumn = function (sender, args) {
        args.cancel = true;

        // determine new sort
        if ($scope.ctx.sort.property == sender.columns[args.col].binding) {
            $scope.ctx.sort.ascending = !$scope.ctx.sort.ascending;
        } else {
            $scope.ctx.sort.property = sender.columns[args.col].binding;
            $scope.ctx.sort.ascending = true;
        };

        var sd = new wijmo.collections.SortDescription($scope.ctx.sort.property, $scope.ctx.sort.ascending); //creates an .ObservableArray
        sender.collectionView.sortDescriptions.clear();
        sender.collectionView.sortDescriptions.push(sd);
    }

    $scope.itemFormatter = function (panel, r, c, cell) {
        //MULTI-SELECT
        // flexGridSetUpService.setUpActions(panel, r, c, cell, 'actions');
        flexGridSetUpService.setUpMultiSelect(panel, r, c, cell, 'selected');
    }


    function setUpMultiSelect(panel, r, c, cell) {
        var flex = panel.grid;
        var col = flex.columns[c];
        // check that this is a boolean column
        if (col.dataType == wijmo.DataType.Boolean && col.binding === "selected") {
            // prevent sorting on click
            col.allowSorting = false;

            // count true values to initialize checkbox
            var cnt = 0;
            for (var i = 0; i < flex.rows.length; i++) {
                if (flex.getCellData(i, c) == true) cnt++;
            }

            // create and initialize checkbox
            cell.innerHTML = '<input type="checkbox"> ';
            cell.className += ' multi-select';
            var cb = cell.firstChild;
            cb.checked = cnt > 0;
            cb.indeterminate = cnt > 0 && cnt < flex.rows.length;


            cb.addEventListener('click', function (e) {
                e.stopPropagation();
                console.log('check click')
                flex.beginUpdate();
                for (var i = 0; i < flex.rows.length; i++) {
                    flex.setCellData(i, c, cb.checked);
                }
                flex.endUpdate();
            });

            //Set up custom sorting for checkbox column
            cell.addEventListener('click', function (e) {
                $scope.sortingColumn(flex, {
                    col: col.index
                });
                //$scope.ctx.flexGrid.autoSizeColumns();
            })


        }
    }

    function updateFlexGridRenderMode() {
        if ($scope.ctx && $scope.ctx.flexGrid && $scope.renderMode == true) {
            //force desktop mode
            flexGridSetUpService.updateFlexGridRowHeight($scope.ctx.flexGrid, 36);
        } else if ($scope.ctx && $scope.ctx.flexGrid && $scope.renderMode != true) {
            //turn off desktop
            flexGridSetUpService.updateFlexGridRowHeight($scope.ctx.flexGrid, 48);
        }
    }

    function setUpColumnVisibility() {
        var flex = $scope.ctx.flexGrid;
        if (flex && $scope.ctx.data.length > 0) {
            $scope.ctx.columnBindingsToggle = [];
            var colBindings = Object.keys($scope.ctx.data[0]);
            var ttl = colBindings.length;
            var cols = 5;
            var rows = Math.ceil(ttl / cols);
            var count = 0;
            for (var i = 0; i < cols; i++) {
                $scope.ctx.columnBindingsToggle[i] = [];
                for (var j = 0; j < rows; j++) {
                    $scope.ctx.columnBindingsToggle[i][j] = colBindings[count];
                    count++;
                    if (count >= ttl) {
                        break;
                    }
                }
            }
            for (var i = 0; i < colBindings.length; i++) {

                $scope.ctx.columnVis[colBindings[i]] = true;
            }
            $scope.actions.toggleVisibility = function (binding) {
                $scope.ctx.columnVis[binding] = !$scope.ctx.columnVis[binding];
            }
        }
    }

    function setUpPagination() {
        if ($scope.ctx.flexGrid) {
            $scope.$watch("ctx.page", function (page) {
                $scope.ctx.flexGrid.collectionView.moveToPage(page - 1);
            });

            $scope.$watch("ctx.pageSize", function (pageSize) {
                $scope.ctx.flexGrid.collectionView.pageSize = pageSize;
            });

            $scope.ctx.flexGrid.collectionView.pageSize = $scope.ctx.pageSize;
        }
    }
}