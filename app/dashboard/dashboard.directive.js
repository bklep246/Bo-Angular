var app;
(function (app) {
    var dashboard;
    (function (dashboard_1) {
        function dashboard() {
            return {
                templateUrl: 'app/dashboard/dashboard.html',
                link: function (scope, element, attrs) {
                    scope.addNewWidget = function (widget) {
                        //deep copy widget settings to be used in new widget
                        var newWidget = angular.copy(widget.settings);
                        //add new widget to array
                        scope.widgets.push(newWidget);
                    };
                }
            };
        }
        angular.module('app').directive('dashboard', dashboard);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=dashboard.directive.js.map