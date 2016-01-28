'use strict';

angular.module('accountWidgets').directive('orderStatus', OrderStatus);

OrderStatus.$inject = ['dataService'];
function OrderStatus(dataService) {
    return {
        templateUrl: function (tElement, tAttrs) {
            return tAttrs.templateUrl;
        },
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}