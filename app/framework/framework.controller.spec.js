(function () {
    'use strict';

    describe('controllers', function () {
        var FrameworkCtrl, scope;
        
        beforeEach(module('app'));
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            FrameworkCtrl = $controller('FrameworkController', {
                $scope: scope
            });
        }));

        it('should have a framework controller', function () {
            expect(FrameworkCtrl).toBeDefined();
        });

        it('should have properties defaults set', function () {
            expect(FrameworkCtrl.isMenuVertical).toBe(true);
            expect(FrameworkCtrl.isMenuButtonVisible).toBe(true);
            expect(FrameworkCtrl.isMenuVertical).toBe(true);
        });
    });
})();
