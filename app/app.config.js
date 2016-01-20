'use strict';

angular.module('app').config(appconfig);

appconfig.$inject = ['$provide'];
function appconfig($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            //alert(exception.message);
        };
    }]);
}