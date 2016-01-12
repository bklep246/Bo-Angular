'use strict';

angular.module('app').config(['$routeProvider', function ($routeProvider) {

    var routes = [
        {
            url: '/accountpages',
            config: {
                template: '<account-dashboard></account-dashboard>'
            }
        },
        {
            url: '/tradingpages',
            config: {
                template: '<trading-dashboard></trading-dashboard>'
            }
        },
        {
            url: '/marketdata',
            config: {
                template: '<div>market data pages</div>'
            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/accountpages' });

}]);