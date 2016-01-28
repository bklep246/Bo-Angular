'use strict';

angular.module('app').directive('accountDashboard', accountDashboard)

accountDashboard.$inject = ['$localStorage'];
function accountDashboard($localStorage) {
    return {
        scope: {
        },
        template: '<dashboard></dashboard>',
        link: function (scope) {

            scope.title = 'Account Widgets Dashboard';

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
                    title: 'Activity',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<activity template-url="ext-modules/accountWidgets/activity/activity.html"></activity>',
                        widgetSettings: {
                            id: 5001
                        }
                    }
                },
                {
                     title: 'Order Status',
                     settings: {
                         sizeX: 5,
                         sizeY: 3,
                         minSizeX: 2,
                         minSizeY: 2,
                         template: '<order-status template-url="ext-modules/accountWidgets/orderStatus/orderStatus.html"></order-status>',
                         widgetSettings: {
                             id: 5000
                         }
                     }
                 }
            ];

            //widgets collection - new widgets get added here
            //check localstorage for saved widgets
            scope.widgets = $localStorage.accountwidgets || [];

            scope.$watch('widgets', function () {
                $localStorage.accountwidgets = scope.widgets;
            }, true
            );
        }
    };
}