'use strict';

angular.module('accountWidgets').directive('activity', Activity);

Activity.$inject = ['dataService'];
function Activity(dataService) {
    return {
        templateUrl: 'ext-modules/accountWidgets/activity/activity.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}