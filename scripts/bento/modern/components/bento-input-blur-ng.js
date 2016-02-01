/**
 * Bento Input Blur NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 18/09/2014
 *
 * Changelog:
 *
 * 18/09/2014
 * - safeApply is added to `focus` and `blur` to avoid apply cras (Jira# CXUI-289)
 *
 * 06/2014
 * - Initial build
 *
 * @ Referenced from:
 *     http://stackoverflow.com/questions/15798594/angularjs-forms-validate-fields-after-user-has-left-field
 */


(function (angular, window, undefined) {

  'use strict';

  angular.module('bento.inputblur', [])
    .directive('input', [
      function() {
        return {
          restrict: 'E',
          require : '?ngModel',
          link    : function (scope, element, attr, control) {
            if (!control) {
              return;
            }

            element.on('focus', function () {
              // Using safe apply to comply bug [CXUI-289]
              scope.safeApply(function(){
                element.addClass('has-focus');
                control.hasFocus = true;
              });
            });

            element.on('blur', function () {
              // Using safe apply to comply bug [CXUI-289]
              scope.safeApply(function() {
                element.removeClass('has-focus');
                element.addClass('has-visited');
                control.hasFocus = false;
                control.hasVisited = true;
              });
            });

            // Using a safeApply to prevent apply crash
            scope.safeApply = function(fn) {
              var phase = this.$root.$$phase;
              if(phase === '$apply' || phase === '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                  fn();
                }
              } else {
                this.$apply(fn);
              }
            };

            // extend $setPristine()
            if(!!control.$setPristine){
              control.$setPristineUsedByBentoInputBlur = control.$setPristine;

              control.$setPristine = function(){
                // called Super function
                control.$setPristineUsedByBentoInputBlur();
                // Resetting hasVisited flag

                scope.safeApply(function(){
                  element.removeClass('has-visited');
                  control.hasVisited = false;
                });
              };
            }
          }
        };
      }]);

})(window.angular, window);