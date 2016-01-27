(function () {
    'use strict';

    describe('controllers', function () {
        var MenuCtrl, scope;

        beforeEach(module('app'));
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            //scope = {};
            MenuCtrl = $controller('MenuController', {
                $scope: scope
            });
        }));

        describe('menu controller variables', function () {
            it('should have properties defaults set', function () {
                //var $scope = {};
                //var controller = $controller('MenuController', { $scope: $scope });

                expect(MenuCtrl.showMenu).toBe(true);
            });
        });
    });
})();
