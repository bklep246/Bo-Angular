'use strict';

angular.module('app').directive('boMenu', ['$timeout', function ($timeout) {
    return {
        scope:{

        },
        transclude: true,
        templateUrl: 'app/menu/boMenuTemplate.html',
        controller: 'boMenuController',
        link: function (scope, el, attr) {
            //used to automatically select the first item in the menu
            var item = el.find('.bo-selectable-item:first');
            //call timeout so the click event happens after the digest cycle
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);