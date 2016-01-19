﻿'use strict';

angular.module('app').directive('accountDashboard', AccountDashboardDirective)

AccountDashboardDirective.$inject = ['$localStorage'];
function AccountDashboardDirective($localStorage) {
    return {
        scope: {
        },
        template: '<bo-dashboard></bo-dashboard>',
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
                        template: '<activity></activity>',
                        widgetSettings: {
                            id: 5001,
                            templateUrl: 'ext-modules/accountWidgets/activity/activityTemplate.html'
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
                         template: '<order-status></order-status>',
                         widgetSettings: {
                             id: 5000,
                             templateUrl: 'ext-modules/accountWidgets/orderStatus/orderStatusTemplate.html'
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