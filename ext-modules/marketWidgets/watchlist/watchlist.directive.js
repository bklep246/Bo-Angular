'use strict';

angular.module('marketWidgets').directive('watchlist', Watchlist);

Watchlist.$inject = ['dataService'];
function Watchlist(dataService) {
    return {
        templateUrl: 'ext-modules/marketWidgets/watchlist/watchlist.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}