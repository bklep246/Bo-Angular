'use strict';

angular.module('app').directive('tradingDashboard', tradingDashboard);

tradingDashboard.$inject = ['$localStorage'];
function tradingDashboard($localStorage) {
    return {
        scope: {
        },
        template: '<dashboard></dashboard>',
        link: function (scope) {

            scope.title = 'Trading Widgets Dashboard';

            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: true,
                mobileBreakPoint: 600
            };

            scope.widgetDefinitions = [
                {
                    title: 'Equity',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<equity></equity>',
                        widgetSettings: {
                            id: 5001,
                            templateUrl: 'ext-modules/tradingWidgets/equity/equityTemplate.html'
                        }
                    }
                },
                {
                    title: 'Options',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<options></options>',
                        widgetSettings: {
                            id: 5000,
                            templateUrl: 'ext-modules/tradingWidgets/options/optionsTemplate.html'
                        }
                    }
                },
                {
                    title: 'Mutual Fund',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<mutual-fund></mutual-fund>',
                        widgetSettings: {
                            id: 5002,
                            templateUrl: 'ext-modules/tradingWidgets/mutualFund/mutualFundTemplate.html'
                        }
                    }
                }
            ];

            //widgets collection - new widgets get added here
            //check localstorage for saved widgets
            scope.widgets = $localStorage.tradingwidgets || [];

            scope.$watch('widgets', function () {
                $localStorage.tradingwidgets = scope.widgets;
            }, true
            );
        }
    };
}