'use strict';

angular.module('accountWidgets').directive('orderStatus', OrderStatus);

OrderStatus.$inject = ['dataService'];
function OrderStatus(dataService) {
    return {
        templateUrl: 'ext-modules/accountWidgets/orderStatus/orderStatus.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}