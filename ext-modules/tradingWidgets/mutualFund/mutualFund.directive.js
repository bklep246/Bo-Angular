var extModules;
(function (extModules) {
    var trading;
    (function (trading) {
        MutualFund.$inject = ['dataService'];
        function MutualFund(dataService) {
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
        angular.module('tradingWidgets').directive('mutualFund', MutualFund);
    })(trading = extModules.trading || (extModules.trading = {}));
})(extModules || (extModules = {}));
//# sourceMappingURL=mutualFund.directive.js.map