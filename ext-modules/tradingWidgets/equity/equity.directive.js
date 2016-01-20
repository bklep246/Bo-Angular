'use strict';

angular.module('tradingWidgets').directive('equity', Equity);

Equity.$inject = ['dataService'];
function Equity(dataService) {
    return {
        templateUrl: 'ext-modules/tradingWidgets/equity/equity.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}