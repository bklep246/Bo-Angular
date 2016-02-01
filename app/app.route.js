'use strict';

angular.module('app').config(routeConfig);

routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {

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
                template: '<market-dashboard></market-dashboard>'
            }
        },
        {
            url: '/bentocomponents',
            config: {
                template: '<bento-dashboard></bento-dashboard>'
            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/accountpages' });

}