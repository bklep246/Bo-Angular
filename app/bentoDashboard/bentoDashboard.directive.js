'use strict';

angular.module('app').directive('bentoDashboard', bentoDashboard)

function bentoDashboard() {
    return {
        controller: 'BentoController as vm',
        templateUrl: 'app/bentoDashboard/bentoDashboard.html'
    };
}