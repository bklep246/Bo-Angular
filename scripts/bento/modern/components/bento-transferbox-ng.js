/**
 * Bento TransferBox Client-Side NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.1.0
 * @date 09/2014
 * features:
 * - on transferring items, un-sort, so items transferred display first
 * - uses datatables scrollY option, to allow sticky header and scrollable tbody
 * - use javascript to set column headers widths upon window or splitter resize
 * - need to use exposed datatable for column filter, as column filter sits outside of datatable directive,
 * due to datatable scrollY option creating two different tables, one for body, and one for head
 * 1/26/2015 - update to Angular 1.3, remove DOM reference to DataTables.
 */

(function(angular, undefined) {
    'use strict';

    angular.module('bento.transferbox', [
        'bento.cookie',
        'pascalprecht.translate',
    ])
        .config([
            '$translateProvider',
            '$bentoTranslateLoaderProvider',
            '$bentoJSRootProvider',
            '$bentoCookieProvider',
            function($translateProvider, $bentoTranslateLoaderProvider, $bentoJSRootProvider, $bentoCookieProvider) {

                // Concert team Support
                var language = $bentoCookieProvider.getCookie('uiCulture', 'en');

                // Setup provider
                $bentoJSRootProvider.configAngularTranslateProvider(
                    'bento-transferbox',
                    $translateProvider,
                    $bentoTranslateLoaderProvider,
                    language
                );

            }
        ])
        .controller('bentoTransferBoxController', [
            '$scope',
            function($scope) {
                /**** LOADER ***/
                var marginHeight = 260;
                var buttonPad = 0,
                    buttonPadSecond = 0;
                /**************************************** Tansferbox Initialization ***********************************/

                $scope.selectItems = [{
                    value: 25,
                    label: 25
                }, {
                    value: 50,
                    label: 50
                }, {
                    value: 100,
                    label: 100
                }];

                $scope.currentInfo = {
                    page: 1, //current page
                    gridData: [], //data array to display in table
                    assignedData: [],
                    selectedUsersArray: [], //if checkbox is selected, item's unique id
                    availableSearchTerm: '',
                    assignedSearchTerm: '',
                    selectedAvailableItems: [],
                    selectedAssignedItems: [],
                    totalAvailableItems: 0,
                    totalAssignedItems: 0,
                    availableItemsPage: 1,
                    assignedItemsPage: 1,
                    numItemsAvailable: 25, //number of rows to display
                    numItemsAssigned: 25,
                    transferBtnText: 'Transfer',
                    selectedTitle: 'Selected Users',
                    availableTitle: 'Available Users',
                    boxOneClickState: false,
                    boxTwoClickState: false,
                    dataTable1: undefined,
                    dataTable2: undefined,
                    infoText: '_SELECTED_ of _TOTAL_ Checked',
                    paginationInfoText: '_START_ to _END_ of _MAX_ Entries',
                    paginationGoText: 'Go',
                    paginationInfoPageText: 'Page _PAGE_ of _PAGES_',
                    boxOneInfoText: '',
                    boxTwoInfoText: '',
                    boxOneInfoShown: false,
                    boxTwoInfoShown: false,
                    columnDefinitions: undefined,
                    columnFilterDefinitions: undefined,
                    columnFilterToggle: false,
                    uniqueKey: ''
                };

                $scope.numItemsAvailable = 10;

                $scope.dataTable = undefined;
                $scope.buttons = [];
                $scope.tableOptions = {
                    'autoWidth': false,
                    'stateSave': false,
                    'paginate': true,
                    'deferRender': true,
                    'filter': true,
                    'destroy': false,
                    'processing': true,
                    'ordering': true,
                    'order': [],
                    'dom': '<"top">rt<"bottom"f><"clear">SR'
                };
                //set up column definitions
                $scope.tableOptions.scrollY = ($scope.height - marginHeight) + 'px';

            }
        ])
        .directive('bentoTransferbox', [
            '$timeout',
            '$translate',
            function($timeout, $translate) {
                return {
                    restrict: 'AE',
                    scope: {
                        boxOneItemSource: '=',
                        boxTwoItemSource: '=',
                        columnDefinitions: '=',
                        columnFilterDefinitions: '=',
                        boxOneTitle: '@',
                        boxTwoTitle: '@',
                        infoText: '@',
                        transferBtnText: '@',
                        height: '=',
                        onTransfer: '&',
                        lang: '=',
                        uniqueKey: '@',
                        paginationInfoText: '@',
                        paginationGoText: '@',
                        paginationInfoPageText: '@'
                    },
                    controller: 'bentoTransferBoxController',
                    templateUrl: '../templates/transfer_box/bento-transferbox.html',
                    replace: true,
                    link: function(scope, element, attrs) {
                        var marginHeight = 260;
                        var buttonPad = 0,
                            buttonPadSecond = 0;

                        /**************************************** Transferbox Events **************************************************/

                        scope.transferItems = function(transferType) {

                            var selectedItems = scope.currentInfo.selectedAssignedItems;
                            var fromArray = scope.currentInfo.assignedData;
                            var toArray = scope.currentInfo.gridData;

                            if (transferType === "toAssigned") {
                                selectedItems = scope.currentInfo.selectedAvailableItems;
                                fromArray = scope.currentInfo.gridData;
                                toArray = scope.currentInfo.assignedData;
                            }

                            turnOffSort();
                            for (var i = selectedItems.length - 1; i >= 0; i--) {
                                for (var j = 0, ttl = fromArray.length; j < ttl; j++) {
                                    if (fromArray[j] && fromArray[j].id ===
                                        JSON.parse(selectedItems[i])) {
                                        toArray.unshift(
                                            fromArray.splice(j, 1)[0]
                                        );
                                    }
                                }
                            }
                            scope.currentInfo.selectedAssignedItems = [];
                            scope.currentInfo.selectedAvailableItems = [];
                            resizeBoxes();
                            resetTransferBox();
                            updateDataScope();

                        };

                        /**************************************** End of Transferbox Events **************************************************/
                        
                        /**
                         * TRANSLATION
                         */

                        if (attrs.lang !== undefined) {
                            scope.$watch('lang', function(language) {
                                if (!!scope.lang) {
                                    scope.language = language;
                                    $translate.use(scope.lang).then(function() {
                                        $translate('TRANSFER_BOX_INFO_TEXT').then(function(text) {
                                            scope.currentInfo.infoText = text;
                                            updateInfoText();
                                        });
                                        $translate('TRANSFER_BOX_BTN_TEXT').then(function(text) {
                                            scope.currentInfo.transferBtnText = text;
                                        });
                                    });
                                }
                            });
                        }

                        /**
                         * WATCHES
                         */

                        if (attrs.infoText) {
                            scope.$watch('infoText', function(infoText) {
                                scope.currentInfo.infoText = infoText;
                                updateInfoText();
                            });
                        }
                        if (attrs.uniqueKey) {
                            scope.$watch('uniqueKey', function(key) {
                                scope.currentInfo.uniqueKey = key;
                            });
                        }
                        if (attrs.paginationInfoText) {
                            scope.$watch('paginationInfoText', function(text) {
                                scope.currentInfo.paginationInfoText = text;
                            });
                        }
                        if (attrs.paginationInfoPageText) {
                            scope.$watch('paginationInfoPageText', function(text) {
                                scope.currentInfo.paginationInfoPageText = text;
                            });
                        }
                        if (attrs.paginationGoText) {
                            scope.$watch('paginationGoText', function(text) {
                                scope.currentInfo.paginationGoText = text;
                            });
                        }
                        if (attrs.transferBtnText) {
                            scope.$watch('transferBtnText', function(text) {
                                scope.currentInfo.transferBtnText = text;
                            });
                        }

                        scope.$watchCollection('boxOneItemSource', function(data) {
                            updateColumnDefinitions();
                            updateColumnFilterDefinitions();
                            if (data) {
                                scope.currentInfo.gridData = data;
                                scope.currentInfo.totalAvailableItems = data.length;
                            }

                            resizeBoxes();
                        });

                        scope.$watchCollection('boxTwoItemSource', function(data) {
                            updateColumnDefinitions();
                            updateColumnFilterDefinitions();
                            if (data) {
                                scope.currentInfo.assignedData = data;
                                scope.currentInfo.totalAssignedItems = data.length;
                            }
                            resizeBoxes();
                        });
                        scope.$watch('columnFilterDefinitions', function(definitions) {
                            updateColumnFilterDefinitions();
                        });
                        scope.$watch('columnDefinitions', function(definitions) {
                            updateColumnDefinitions();
                        });
                        scope.$watch('boxOneTitle', function(title) {
                            scope.currentInfo.availableTitle = title;
                        });
                        scope.$watch('boxTwoTitle', function(title) {
                            scope.currentInfo.selectedTitle = title;
                        });
                        scope.$watchCollection('currentInfo.selectedAvailableItems', function() {
                            updateInfoText();
                        });
                        scope.$watchCollection('currentInfo.selectedAssignedItems', function() {
                            updateInfoText();
                        });
                        scope.$watch('currentInfo.totalAssignedItems', function() {
                            updateInfoText();
                        });
                        scope.$watch('currentInfo.totalAvailableItems', function() {
                            updateInfoText();
                        });
                        
                        /**
                         * DataTables Events
                         */

                        scope.onTableCreatedRight = function(dataTableAPI) {
                            scope.currentInfo.dataTable2 = dataTableAPI;
                            resizeBoxes();
                        }
                        scope.onTableCreatedLeft = function(dataTableAPI) {
                            scope.currentInfo.dataTable1 = dataTableAPI;
                            resizeBoxes();
                        };
                        scope.onTableDrawn = function() {
                            resizeBoxes();
                            updateInfoText();
                        };

                        /**
                         * Splitter Evnents
                         */
                        scope.onSplitterResize = function() {
                            resizeBoxes();
                        };


                        /**
                         * Directive Methods
                         */

                        function turnOffSort() {
                            if (scope.currentInfo.dataTable1 && scope.currentInfo.dataTable2) {
                                //scope.currentInfo.dataTable1.fnSortNeutral();
                                //scope.currentInfo.dataTable2.fnSortNeutral();
                                scope.currentInfo.dataTable1
                                    .column(0)
                                    .data()
                                    .sort();
                                scope.currentInfo.dataTable2
                                    .column(0)
                                    .data()
                                    .sort();
                            }
                        }

                        function updateColumnDefinitions() {
                            if (attrs.columnDefinitions) {
                                scope.currentInfo.columnDefinitions = scope.columnDefinitions;
                            }

                        }

                        function updateColumnFilterDefinitions() {
                            if (attrs.columnFilterDefinitions) {
                                scope.currentInfo.columnFilterDefinitions = scope.columnFilterDefinitions;
                                scope.currentInfo.columnFilterToggle = true;
                            }
                        }

                        function updateInfoText() {
                            scope.currentInfo.boxOneInfoText = scope.currentInfo.selectedAvailableItems.length > 0 ? scope.currentInfo.infoText.replace('_SELECTED_', scope.currentInfo.selectedAvailableItems.length).replace('_TOTAL_', scope.currentInfo.totalAvailableItems) : scope.currentInfo.totalAvailableItems;
                            scope.currentInfo.boxTwoInfoText = scope.currentInfo.selectedAssignedItems.length > 0 ? scope.currentInfo.infoText.replace('_SELECTED_', scope.currentInfo.selectedAssignedItems.length).replace('_TOTAL_', scope.currentInfo.totalAssignedItems) : scope.currentInfo.totalAssignedItems;
                            buttonPad = element[0].getElementsByClassName('transferbox-btn')[0].offsetWidth + element[0].getElementsByClassName('transferbox-header-title')[0].offsetWidth;
                            buttonPadSecond = element[0].getElementsByClassName('transferbox-btn')[1].offsetWidth + element[0].getElementsByClassName('transferbox-header-title')[1].offsetWidth + 15;
                        }

                        function resetTransferBox() {
                            scope.currentInfo.boxOneClickState = false;
                            scope.currentInfo.boxTwoClickState = false;
                        }

                        function updateDataScope() {
                            scope.boxOneItemSource = scope.currentInfo.gridData;
                            scope.boxTwoItemSource = scope.currentInfo.assignedData;
                            scope.onTransfer({
                                gridDataOne: scope.currentInfo.gridData,
                                gridDataTwo: scope.currentInfo.assignedData
                            });
                        }

                        function resizeBoxes() {
                            var $tableOne = angular.element(element).find('table:eq(1)');
                            var $tableTwo = angular.element(element).find('table:eq(3)');
                            $tableOne.width('100%');
                            $tableTwo.width('100%');

                            var boxWidth = element[0].getElementsByClassName('transferbox-header')[0].offsetWidth - 50;
                            var boxWidthSecond = element[0].getElementsByClassName('transferbox-header')[1].offsetWidth - 40;
                            // Hide info text using ng-show if transfer button starts to overlap
                            $timeout(function() {
                                if (boxWidth < buttonPad) {
                                    scope.currentInfo.boxOneInfoShown = false;
                                } else {
                                    scope.currentInfo.boxOneInfoShown = true;
                                }
                                if (boxWidthSecond < buttonPadSecond) {
                                    scope.currentInfo.boxTwoInfoShown = false;
                                } else {
                                    scope.currentInfo.boxTwoInfoShown = true;
                                }
                            }, 0);

                        }
                    }
                };
            }
        ]);
}(window.angular));