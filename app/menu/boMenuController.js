'use strict';

angular.module('app').controller('boMenuController', BoMenuController);

BoMenuController.$inject = ['$scope', '$rootScope'];
function BoMenuController($scope, $rootScope) {
    var vm = this;
    vm.openMenuScope = null;
    vm.showMenu = true;
    
    vm.getActiveElement = function () {
        return vm.activeElement;
    };

    vm.setActiveElement = function (el) {
        vm.activeElement = el;
    };

    vm.setRoute = function (route) {
        $rootScope.$broadcast('bo-menu-item-selected-event',
            { route: route });
    };

    vm.setOpenMenuScope = function (scope) {
        vm.openMenuScope = scope;
    };

    angular.element(document).bind('click', function (e) {
        if (vm.openMenuScope && !vm.isVertical) {
            if (angular.element(e.target).parent().hasClass('bo-selectable-item')) {
                return;
            }
            $scope.$apply(function () {
                vm.openMenuScope.closeMenu();
            });
            e.preventDefault();
            e.stopPropagation();
        }
    });

    $scope.$on('bo-menu-show', function (evt, data) {
        vm.showMenu = data.show;
    });
}