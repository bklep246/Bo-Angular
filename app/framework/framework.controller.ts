module app.framework {
    interface IFrameworkModel {
        isMenuVisible: boolean;
        isMenuButtonVisible: boolean;
        isMenuVertical: boolean;
        checkWidth(): void;
    }

    /**
     * FrameworkController implements IFrameworkModel
     */
    class FrameworkController implements IFrameworkModel {
        static $inject = ['$scope', '$rootScope', '$window', '$timeout', '$location'];
        isMenuVisible: boolean;
        isMenuButtonVisible: boolean;
        isMenuVertical: boolean;
        routeString: string;
        //var vm;
        
        constructor(
            public $scope: ng.IScope,
            public $rootScope: ng.IRootScopeService,
            public $window: ng.IWindowService,
            public $timeout: ng.ITimeoutService,
            public $location: ng.ILocationService) {

            //vm = this;
            this.isMenuVisible = true;
            this.isMenuButtonVisible = true;
            this.isMenuVertical = true;

            $scope.$on('bo-menu-item-selected-event', function(evt, data) {
                this.routeString = data.route;
                $location.path(data.route);
                if (this.checkWidth) {
                    this.checkWidth();
                }
                
                //broadcastMenuState();
            });

            $scope.$on('bo-menu-orientation-changed-event', function() {
                //$scope.isMenuVertical = data.isMenuVertical;
                //resize widget grid when switching menu orientation
                //when this event is called angular is already in the middle of a digest cycle so 
                //$timeout is used to trigger an apply after the current cycle finishes
                $timeout(function() {
                    angular.element($window).trigger('resize');
                }, 0);
            });

            $scope.$on('$destroy', function() {
                angular.element($window).off('resize.framework'); // remove the handler added earlier
            });

            angular.element(this.$window).on('resize.framework', function() {
                this.$scope.$apply(function() {
                    if (this.checkWidth) {
                        this.checkWidth();
                    }
                });
            });

        }

        checkWidth() {
            //Math.max gets full width of viewport to take scrollbar into account
            var width = Math.max(angular.element(this.$window).width(), this.$window.innerWidth);
            this.isMenuVisible = (width >= 768);
        }
    }

    angular.module('app').controller('FrameworkController', FrameworkController);
}