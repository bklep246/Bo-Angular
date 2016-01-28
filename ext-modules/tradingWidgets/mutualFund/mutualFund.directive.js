'use strict';

angular.module('tradingWidgets').directive('mutualFund', MutualFund);

MutualFund.$inject = ['dataService'];
function MutualFund(dataService) {
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