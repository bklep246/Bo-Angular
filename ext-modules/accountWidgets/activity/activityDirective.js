'use strict';

angular.module('accountWidgets').directive('activity', ActivityDirective);

ActivityDirective.$inject = ['dataService'];
function ActivityDirective(dataService) {
    return {
        templateUrl: 'ext-modules/accountWidgets/activity/activityTemplate.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}