/**
 * Bento Off Canvas Menu NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 29/10/2014
 *
 * 29/10/2014
 * - Re-organizing directive into child-directives to
 * - Instead of doing a push over, the side menu now becomes an overlay
 *
 *
 * 11/03/2014
 *
 * Initial Build
 *
 */

(function (window, angular, undefined) {
  'use strict';

//Define bentoUI App object
  angular.module('bento.off.canvas.menu', [])
    .controller('bentoOffCanvasMenuController',[
      '$scope',
      '$element',
      function($scope, $element){
        //When the hamburger menu is clicked
        $scope.onMenuClick = function () {
          $element.toggleClass('expanded');
        };

        //Fires when the content is clicked
        //Check and retract the Off Canvas Menu
        $scope.onContentClick = function () {
          if ($element.hasClass('expanded')) {
            $element.toggleClass('expanded');
          }
        };
      }
    ])
    .directive('bentoOffCanvasMenu', [function () {
      /**
       * Main Off Canvas Menu Directive
       */
      return {
        restrict  : 'AE',
        scope     : false,
        controller: 'bentoOffCanvasMenuController',
        link      : function (scope, element, attrs, controller) {

          //Listen to route change when a menu link is clicked
          //Need do it the native javascript way
          //Thought to migrate it to NG version using routeProvider?
          angular.element(window).on("hashchange", function (event) {
            var $menu = angular.element(querySelector(element[0], 'div[bento-off-canvas-menu-aside]'));
            var aArray = $menu.find('a');

            //find and toggle 'selected' class
            for (var i = 0; i < aArray.length; i++) {
              var a = aArray[i];
              a.parentNode.className = (window.location.hash === a.hash) ? 'selected' : '';
            }

          }, false);


          element.addClass('bento-off-canvas-menu');

          //Get menu object from DOM
          var $menu = angular.element(querySelector(element[0], '.bento-off-canvas-menu-aside'));

          //Get navbar object from DOM
          var $navbar = angular.element(querySelector(element[0], '.bento-off-canvas-menu-topbar'));

          //Get content object from DOM
          var $content = angular.element(querySelector(element[0], '.bento-off-canvas-menu-content'));

          //Add hamburger icon to navbar
          var $hambugerButton = angular.element('<div class="bento-off-canvas-menu-icon"></div>');

          //Inject a fake background to the menu so it fully extends to the bottom of the page
          $content.append('<div class="bento-off-canvas-menu-content-overlay"></div>');
          $content.append('<div class="bento-off-canvas-menu-aside-bg"></div>');

          $navbar.prepend($hambugerButton);

          //Find and highlight menu item
          var aArray = $menu.find('a');

          //find and toggle 'selected' class
          //TODO: needto integrate this part of the code with ng-route
          for (var i = 0; i < aArray.length; i++) {
            var a = aArray[i];
            a.parentNode.className = (window.location.hash === a.hash) ? 'selected' : '';
          }

          //Adding click actions to menuButton and .bento-off-canvas-menu-content
          $content.on('click', scope.onContentClick);
          $menu.on('click',function(event){
            if(event.target.nodeName){
              //auto collapse left aside menu
              element.removeClass('expanded');
            }
          });
          $hambugerButton.on('click', scope.onMenuClick);

        }
      };
    }])
    .directive('bentoOffCanvasMenuAside', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element, attrs, controller) {
          element.addClass('bento-off-canvas-menu-aside');
        }
      };
    })
    .directive('bentoOffCanvasMenuTopbar', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element, attrs, controller) {
          element.addClass('bento-off-canvas-menu-topbar');
        }
      };
    })
    .directive('bentoOffCanvasMenuContent', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element, attrs, controller) {
          element.addClass('bento-off-canvas-menu-content');
        }
      };
    });

  /*** Helper Function ***/
  function querySelector(element, queryString) {
    var obj = element.querySelector(queryString);

    // Return if obj is not null
    if (typeof obj !== 'undefined' && obj) {
      return obj;
    } else {
      obj = element.querySelector(queryString.replace('div[', 'div[data-'));
      return obj;
    }

  }

})(window, window.angular);