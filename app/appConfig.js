'use strict';

angular.module('app').config(BoConfig);

BoConfig.$inject = ['$provide'];
function BoConfig($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            //alert(exception.message);
        };
    }]);
}