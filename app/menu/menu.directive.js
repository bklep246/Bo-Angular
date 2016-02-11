var app;
(function (app) {
    var menu;
    (function (menu_1) {
        menu.$inject = ['$timeout'];
        function menu($timeout) {
            return {
                scope: {},
                transclude: true,
                templateUrl: 'app/menu/menu.html',
                controller: 'MenuController',
                link: function (scope, el, attr) {
                    //used to automatically select the first item in the menu
                    var item = el.find('.bo-selectable-item:first');
                    //call timeout so the click event happens after the digest cycle
                    $timeout(function () {
                        item.trigger('click');
                    });
                }
            };
        }
        angular.module('app').directive('menu', menu);
    })(menu = app.menu || (app.menu = {}));
})(app || (app = {}));
//# sourceMappingURL=menu.directive.js.map