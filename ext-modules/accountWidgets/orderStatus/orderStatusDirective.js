'use strict';

angular.module('accountWidgets').directive('orderStatus',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'ext-modules/accountWidgets/orderStatus/orderStatusTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                .then(function (data) {
                    scope.selectedEmployee = data;
                });
            }
        };
    }]);