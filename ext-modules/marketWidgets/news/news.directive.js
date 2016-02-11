var extModules;
(function (extModules) {
    var market;
    (function (market) {
        News.$inject = ['dataService'];
        function News(dataService) {
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
        angular.module('marketWidgets').directive('news', News);
    })(market = extModules.market || (extModules.market = {}));
})(extModules || (extModules = {}));
//# sourceMappingURL=news.directive.js.map