module app.menu {
    interface IMenuModel {
        openMenuScope: any;
        showMenu: boolean;
        activeElement: any;
        getActiveElement(): void;
        setActiveElement(el:any): void;
        setRoute(route: string): void;
        setOpenMenuScope(scope: any): void;
    }
   
    /**
     * MenuController
     */
    class MenuController implements IMenuModel {
        static $inject = ['$scope', '$rootScope'];
        
        openMenuScope: any;
        showMenu: boolean;
        activeElement: any;
        
        constructor(
            public $scope: ng.IScope,
            public $rootScope: ng.IRootScopeService) {

            
            angular.element(document).bind('click', function(e) {
                if (this.openMenuScope && !this.isVertical) {
                    if (angular.element(e.target).parent().hasClass('bo-selectable-item')) {
                        return;
                    }
                    $scope.$apply(function() {
                        this.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            $scope.$on('bo-menu-show', function(evt, data) {
                this.showMenu = data.show;
            });
        }
        
        getActiveElement(){
            return this.activeElement;
        }
        
        setActiveElement(el:any) {
            this.activeElement = el;
        }
        
        setRoute(route:string) {
             this.$rootScope.$broadcast('bo-menu-item-selected-event',
                { route: route });
        }
        
        setOpenMenuScope(scope: any) {
            this.openMenuScope = scope;
        }
    }

    angular.module('app').controller('MenuController', MenuController);
}