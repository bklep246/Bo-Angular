'use strict';

angular.module('app').directive('framework', framework);

function framework() {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: 'FrameworkController',
        templateUrl: 'app/framework/framework.html'
    };
}