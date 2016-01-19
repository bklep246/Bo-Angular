'use strict';

angular.module('app').controller('boFrameworkController', BoFrameworkController);

BoFrameworkController.$inject = ['$scope', '$rootScope', '$window', '$timeout', '$location'];
function BoFrameworkController($scope, $rootScope, $window, $timeout, $location) {
    var vm = this;
    vm.isMenuVisible = true;
    vm.isMenuButtonVisible = true;
    vm.isMenuVertical = true;

    $scope.$on('bo-menu-item-selected-event', function (evt, data) {
        vm.routeString = data.route;
        $location.path(data.route);
        checkWidth();
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

    angular.element($window).on('resize.boFramework', function () {
        $scope.$apply(function () {
            checkWidth();
            //broadcastMenuState();
        });
    });
    $scope.$on('$destroy', function () {
        angular.element($window).off('resize.boFramework'); // remove the handler added earlier
    });

    var checkWidth = function () {
        //Math.max gets full width of viewport to take scrollbar into account
        var width = Math.max(angular.element($window).width(), $window.innerWidth);
        vm.isMenuVisible = (width >= 768);
        //vm.isMenuButtonVisible = !vm.isMenuVisible;
    };

    //$scope.menuButtonClicked = function () {
    //    $scope.isMenuVisible = !$scope.isMenuVisible;
    //    broadcastMenuState();
    //    //$scope.$apply();
    //};

    //var broadcastMenuState = function () {
    //    $rootScope.$broadcast('bo-menu-show', {
    //        show: $scope.isMenuVisible,
    //        isVertical: $scope.isMenuVertical,
    //        allowHorizontalToggle: !$scope.isMenuButtonVisible
    //    });
    //};

    //$timeout(function () {
    //    checkWidth();
    //}, 0);
}