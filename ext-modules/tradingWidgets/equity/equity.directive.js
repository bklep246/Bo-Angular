var extModules;
(function (extModules) {
    var trading;
    (function (trading) {
        Equity.$inject = ['dataService'];
        function Equity(dataService) {
            return {
                templateUrl: function (tElement, tAttrs) {
                    return tAttrs.templateUrl;
                },
                link: function (scope, el, attrs) {
                    dataService.getEmployee(scope.item.widgetSettings.id)
                        .then(function (data) {
                        scope.selectedEmployee = data;
                    });
                    scope.symbol = 'test';
                    scope.action = 'buy';
                }
            };
        }
        angular.module('tradingWidgets').directive('equity', Equity);
    })(trading = extModules.trading || (extModules.trading = {}));
})(extModules || (extModules = {}));
//# sourceMappingURL=equity.directive.js.map