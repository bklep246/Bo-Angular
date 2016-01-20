'use strict';

angular.module('tradingWidgets').directive('mutualFund', MutualFund);

MutualFund.$inject = ['dataService'];
function MutualFund(dataService) {
    return {
        templateUrl: 'ext-modules/tradingWidgets/mutualFund/mutualFund.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}