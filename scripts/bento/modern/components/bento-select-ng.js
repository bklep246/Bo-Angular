/**
 * Bento Select Directive
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.5
 * @date 22/09/2014
 *
 * Changelog:
 *
 * 22/09/2014
 * - Major code updates
 *
 * 26/06/2014
 * - Included firefox version 30 fix
 *
 * ng-model is forwarded from ng-transclude to $parent scope.
 */

(function (window, angular, undefined) {
  'use strict';

//Define bentoUI App object
  angular.module('bento.select', ['ui.bootstrap'])
    .directive('bentoSelect', function () {
      return {
        restrict  : 'A',
        scope     : false,
        link      : function(scope, element, attrs, controller){
          element.addClass('bento-select');

          // Add IE and Firefox version for better UI look and feel
          if (window.navigator.userAgent.search(/MSIE 9/gi) !== -1) {
            element.addClass('ie9');
          } else if (window.navigator.userAgent.search(/MSIE 10/gi) !== -1) {
            element.addClass('ie10');
          } else if (window.navigator.userAgent.search(/Firefox/gi) !== -1) {
            element.addClass('firefox');
            element.append('<div class="bento-select-border"></div>');
          }

          // Add button decoration
          element.append('<div class="btn"><span class="bento-icon-arrow-down"></span></div>');
        }
      };
    });

})(window, window.angular);




