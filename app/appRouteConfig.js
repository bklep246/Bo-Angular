'use strict';

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    var routes = [
        {
            url: '/accountpages',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>'
            }
        },
        {
            url: '/tradingpages',
            config: {
                template: '<wwa-locations></wwa-locations>'
            }
        },
        {
            url: '/marketdata',
            config: {
                template: '<wwa-guides></wwa-guides>'
            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/accountpages' });

}]);