'use strict';

angular.module('app').directive('menuItem', menuItem);

function menuItem() {
    return {
        require: '^menu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        templateUrl: 'app/menu/menuItem.html',
        link: function (scope, el, attr, ctrl) {

            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.bo-subitem-section').length > 0;
            };

            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                //use scope.apply when using jquery to trigger digest cycle
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };
}