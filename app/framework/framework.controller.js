var app;
(function (app) {
    var framework;
    (function (framework) {
        /**
         * FrameworkController implements IFrameworkModel
         */
        var FrameworkController = (function () {
            //var vm;
            function FrameworkController($scope, $rootScope, $window, $timeout, $location) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$window = $window;
                this.$timeout = $timeout;
                this.$location = $location;
                //vm = this;
                this.isMenuVisible = true;
                this.isMenuButtonVisible = true;
                this.isMenuVertical = true;
                $scope.$on('bo-menu-item-selected-event', function (evt, data) {
                    this.routeString = data.route;
                    $location.path(data.route);
                    if (this.checkWidth) {
                        this.checkWidth();
                    }
                    //broadcastMenuState();
                });
                $scope.$on('bo-menu-orientation-changed-event', function () {
                    //$scope.isMenuVertical = data.isMenuVertical;
                    //resize widget grid when switching menu orientation
                    //when this event is called angular is already in the middle of a digest cycle so 
                    //$timeout is used to trigger an apply after the current cycle finishes
                    $timeout(function () {
                        angular.element($window).trigger('resize');
                    }, 0);
                });
                $scope.$on('$destroy', function () {
                    angular.element($window).off('resize.framework'); // remove the handler added earlier
                });
                angular.element(this.$window).on('resize.framework', function () {
                    this.$scope.$apply(function () {
                        if (this.checkWidth) {
                            this.checkWidth();
                        }
                    });
                });
            }
            FrameworkController.prototype.checkWidth = function () {
                //Math.max gets full width of viewport to take scrollbar into account
                var width = Math.max(angular.element(this.$window).width(), this.$window.innerWidth);
                this.isMenuVisible = (width >= 768);
            };
            FrameworkController.$inject = ['$scope', '$rootScope', '$window', '$timeout', '$location'];
            return FrameworkController;
        })();
        angular.module('app').controller('FrameworkController', FrameworkController);
    })(framework = app.framework || (app.framework = {}));
})(app || (app = {}));
//# sourceMappingURL=framework.controller.js.map