﻿'use strict';

angular.module('accountWidgets').directive('activity',
    ['dataService',
    function (dataService) {
        return {
            templateUrl: 'ext-modules/accountWidgets/activity/activityTemplate.html',
            link: function (scope, el, attrs) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                .then(function (data) {
                    scope.selectedEmployee = data;
                });
            }
        };
    }]);