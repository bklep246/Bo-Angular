'use strict';

angular.module('accountWidgets').directive('orderStatus', OrderStatusDirective);

OrderStatusDirective.$inject = ['dataService'];
function OrderStatusDirective(dataService) {
        return {
            templateUrl: 'ext-modules/accountWidgets/orderStatus/orderStatusTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                .then(function (data) {
                    scope.selectedEmployee = data;
                });
            }
        };
    }