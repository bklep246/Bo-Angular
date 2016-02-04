'use strict';

angular.module('app').directive('kendoDashboard', kendoDashboard)

function kendoDashboard() {
    return {
        controller: 'KendoController as vm',
        templateUrl: 'app/kendoDashboard/kendoDashboard.html'
    };
}