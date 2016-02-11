var extModules;
(function (extModules) {
    var market;
    (function (market) {
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
        angular.module('marketWidgets').directive('watchlist', Watchlist);
    })(market = extModules.market || (extModules.market = {}));
})(extModules || (extModules = {}));
//# sourceMappingURL=watchlist.directive.js.map