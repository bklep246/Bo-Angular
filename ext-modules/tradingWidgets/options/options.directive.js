'use strict';

angular.module('tradingWidgets').directive('options', Options);

Options.$inject = ['dataService'];
function Options(dataService) {
    return {
        templateUrl: 'ext-modules/tradingWidgets/options/options.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}