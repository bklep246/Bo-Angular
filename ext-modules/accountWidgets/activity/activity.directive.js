'use strict';

angular.module('accountWidgets').directive('activity', Activity);

Activity.$inject = ['dataService'];
function Activity(dataService) {
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