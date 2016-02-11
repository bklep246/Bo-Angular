var app;
(function (app) {
    var directives;
    (function (directives) {
        tradingDashboard.$inject = ['$localStorage'];
        function tradingDashboard($localStorage) {
            return {
                scope: {},
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
                                template: '<equity template-url="ext-modules/tradingWidgets/equity/equity.html"></equity>',
                                widgetSettings: {
                                    id: 5001
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
                                template: '<options template-url="ext-modules/tradingWidgets/options/options.html"></options>',
                                widgetSettings: {
                                    id: 5000
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
                                template: '<mutual-fund template-url="ext-modules/tradingWidgets/mutualFund/mutualFund.html"></mutual-fund>',
                                widgetSettings: {
                                    id: 5002
                                }
                            }
                        }
                    ];
                    //widgets collection - new widgets get added here
                    //check localstorage for saved widgets
                    scope.widgets = $localStorage.tradingwidgets || [];
                    scope.$watch('widgets', function () {
                        $localStorage.tradingwidgets = scope.widgets;
                    }, true);
                }
            };
        }
        angular.module('app').directive('tradingDashboard', tradingDashboard);
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=tradingDashboard.directive.js.map