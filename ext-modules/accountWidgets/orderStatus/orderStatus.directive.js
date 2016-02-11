var extModules;
(function (extModules) {
    var account;
    (function (account) {
        OrderStatus.$inject = ['dataService'];
        function OrderStatus(dataService) {
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
        angular.module('accountWidgets').directive('orderStatus', OrderStatus);
    })(account = extModules.account || (extModules.account = {}));
})(extModules || (extModules = {}));
//# sourceMappingURL=orderStatus.directive.js.map