'use strict';

angular.module('app').directive('boFramework', function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: 'boFrameworkController',
        templateUrl: 'app/framework/boFrameworkTemplate.html'
    };
});