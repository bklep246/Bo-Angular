'use strict';

angular.module('app').directive('marketDashboard', marketDashboard);

marketDashboard.$inject = ['$localStorage'];
function marketDashboard($localStorage) {
    return {
        scope: {
        },
        template: '<dashboard></dashboard>',
        link: function (scope) {

            scope.title = 'Market Widgets Dashboard';

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
                    title: 'News',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<news template-url="ext-modules/marketWidgets/news/news.html"></news>',
                        widgetSettings: {
                            id: 5001
                        }
                    }
                },
                {
                    title: 'Watchlist',
                    settings: {
                        sizeX: 5,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<watchlist template-url="ext-modules/marketWidgets/watchlist/watchlist.html"></watchlist>',
                        widgetSettings: {
                            id: 5000
                        }
                    }
                }
            ];

            //widgets collection - new widgets get added here
            //check localstorage for saved widgets
            scope.widgets = $localStorage.marketwidgets || [];

            scope.$watch('widgets', function () {
                $localStorage.marketwidgets = scope.widgets;
            }, true
            );
        }
    };
}