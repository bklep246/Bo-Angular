'use strict';

angular.module('tradingWidgets').directive('mutualFund', MutualFundDirective);

MutualFundDirective.$inject = ['dataService'];
function MutualFundDirective(dataService) {
    return {
        templateUrl: 'ext-modules/tradingWidgets/mutualFund/mutualFundTemplate.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}