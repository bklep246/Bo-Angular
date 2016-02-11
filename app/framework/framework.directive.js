var app;
(function (app) {
    var framework;
    (function (framework_1) {
        function framework() {
            return {
                transclude: true,
                scope: {
                    title: '@',
                    subtitle: '@',
                    iconFile: '@'
                },
                controller: 'FrameworkController',
                templateUrl: 'app/framework/framework.html'
            };
        }
        angular.module('app').directive('framework', framework);
    })(framework = app.framework || (app.framework = {}));
})(app || (app = {}));
//# sourceMappingURL=framework.directive.js.map