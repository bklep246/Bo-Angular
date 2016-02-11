var app;
(function (app) {
    var menu;
    (function (menu) {
        /**
         * MenuController
         */
        var MenuController = (function () {
            function MenuController($scope, $rootScope) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                angular.element(document).bind('click', function (e) {
                    if (this.openMenuScope && !this.isVertical) {
                        if (angular.element(e.target).parent().hasClass('bo-selectable-item')) {
                            return;
                        }
                        $scope.$apply(function () {
                            this.openMenuScope.closeMenu();
                        });
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                $scope.$on('bo-menu-show', function (evt, data) {
                    this.showMenu = data.show;
                });
            }
            MenuController.prototype.getActiveElement = function () {
                return this.activeElement;
            };
            MenuController.prototype.setActiveElement = function (el) {
                this.activeElement = el;
            };
            MenuController.prototype.setRoute = function (route) {
                this.$rootScope.$broadcast('bo-menu-item-selected-event', { route: route });
            };
            MenuController.prototype.setOpenMenuScope = function (scope) {
                this.openMenuScope = scope;
            };
            MenuController.$inject = ['$scope', '$rootScope'];
            return MenuController;
        })();
        angular.module('app').controller('MenuController', MenuController);
    })(menu = app.menu || (app.menu = {}));
})(app || (app = {}));
//# sourceMappingURL=menu.controller.js.map