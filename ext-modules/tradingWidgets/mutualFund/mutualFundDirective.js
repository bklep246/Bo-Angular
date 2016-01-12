'use strict';

angular.module('tradingWidgets').directive('mutualFund',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'ext-modules/tradingWidgets/mutualFund/mutualFundTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                .then(function (data) {
                    scope.selectedEmployee = data;
                });
            }
        };
    }]);