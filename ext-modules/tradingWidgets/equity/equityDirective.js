﻿'use strict';

angular.module('tradingWidgets').directive('equity',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'ext-modules/tradingWidgets/equity/equityTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                .then(function (data) {
                    scope.selectedEmployee = data;
                });
            }
        };
    }]);