'use strict';

angular.module('app').directive('boDashboard', function () {
    return {
        templateUrl: 'app/dashboard/boDashboardTemplate.html',
        link: function (scope, element, attrs) {
            scope.addNewWidget = function (widget) {
                //deep copy widget settings to be used in new widget
                var newWidget = angular.copy(widget.settings);
                //add new widget to array
                scope.widgets.push(newWidget);
            };
        }
    };
});