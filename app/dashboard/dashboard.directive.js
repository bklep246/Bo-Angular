'use strict';

angular.module('app').directive('dashboard', dashboard);

function dashboard() {
    return {
        templateUrl: 'app/dashboard/dashboard.html',
        link: function (scope, element, attrs) {
            scope.addNewWidget = function (widget) {
                //deep copy widget settings to be used in new widget
                var newWidget = angular.copy(widget.settings);
                //add new widget to array
                scope.widgets.push(newWidget);
            };
        }
    };
}