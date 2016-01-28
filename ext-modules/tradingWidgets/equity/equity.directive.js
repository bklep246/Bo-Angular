'use strict';

angular.module('tradingWidgets').directive('equity', Equity);

Equity.$inject = ['dataService'];
function Equity(dataService) {
    return {
        templateUrl: function (tElement, tAttrs) {
            return tAttrs.templateUrl;
        },
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });

            scope.symbol = 'test';
            scope.action = 'buy';
        }
    };
}