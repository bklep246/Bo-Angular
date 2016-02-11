var extModules;
(function (extModules) {
    var account;
    (function (account) {
        Activity.$inject = ['dataService'];
        function Activity(dataService) {
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
        angular.module('accountWidgets').directive('activity', Activity);
    })(account = extModules.account || (extModules.account = {}));
})(extModules || (extModules = {}));
//# sourceMappingURL=activity.directive.js.map