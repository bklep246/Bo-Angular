'use strict';

angular.module('marketWidgets').directive('watchlist', Watchlist);

Watchlist.$inject = ['dataService'];
function Watchlist(dataService) {
    return {
        templateUrl: function (tElement, tAttrs) {
            return tAttrs.templateUrl;
        },
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}