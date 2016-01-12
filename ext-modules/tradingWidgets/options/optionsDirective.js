'use strict';

angular.module('tradingWidgets').directive('options',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'ext-modules/tradingWidgets/options/optionsTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                .then(function (data) {
                    scope.selectedEmployee = data;
                });
            }
        };
    }]);