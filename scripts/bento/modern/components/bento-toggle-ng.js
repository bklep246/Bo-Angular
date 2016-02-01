/**
 * Bento Toggle NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.3.1
 * @date 10/12/2014
 *
 * 10/12/2014
 * - Tabindex is set to 0 to work with natural tab indexes
 * - Spacebar toggles state
 *
 * 11/11/2014
 * - Removing deprecated attributes
 * - Simplify code
 * - Using ngModel instead of `state`
 *
 * 15/07/2014
 * New Features:
 * - `lock-to-state` is added to provider user to tick to only one state
 *
 * 13/06/2014
 * Initial build
 *
 */

(function (window, angular, undefined) {

  'use strict';

  angular.module('bento.toggle', ['bento.services'])
  /**
   * Controller Declaration
   */
    .controller('bentoToggleController', [
      '$scope',
      '$element',
      '$bentoServices',
      function ($scope, $element, $bentoServices) {

        if (typeof $scope.ngModel === 'undefined' ) {
          $scope.ngModel = false;
        }

        /**
         * Swipe gestures
         */
        var startDragging = false;
        var startX = 0;
        var triggeringDX = $element[0].offsetWidth * 0.3; //trigering distance when mouse or touch is moved
        var pointerDown;
        var pointerMove;
        var pointerUp;
        $scope.isTouch = $bentoServices.isTouchSupported();

        pointerDown = 'touchstart mousedown';
        pointerMove = 'touchmove mousemove';
        pointerUp = 'touchend mouseup';


        $element.on(pointerDown, touchdown);
        $element.on('keydown', function(event){
          if(event.keyCode === 32) // Space
          {
            toggle(event);
          }
        });

        /**
         * Touchdown / Mousedown
         * @param event
         */

        function touchdown(event) {

          // ignore toggle event when this is locked
          if ($scope.isLocked()) {
            return;
          }

          // ignore user event if there is a one-way lock
          if (typeof $scope.lockToState !== 'undefined') {
            if (($scope.lockToState && $scope.ngModel) ||
                (!$scope.lockToState && !$scope.ngModel))
            {

              return;
            }
          }

          startDragging = true;
          startX = !!event.originalEvent && event.originalEvent.touches ?
            event.originalEvent.touches[0].pageX : event.pageX;

          $element.on(pointerMove, touchmove);
          $element.on(pointerUp, toggle);
          $element.off(pointerDown, touchdown);

          event.stopPropagation(); //disable mousedown on touch devices
        }

        /**
         * Turn ON or OFF based on mouse/touch `x` swipes
         * @param event
         */
        function touchmove(event) {
          var dX = !!event.originalEvent && event.originalEvent.touches ?
          event.originalEvent.touches[0].pageX - startX : event.pageX - startX;
          var absDX = Math.abs(dX);

          // Check deltaX to define ON or OFF
          if (absDX > triggeringDX) {
            if (dX > 0) {
              $scope.ngModel = true;
            } else {
              $scope.ngModel = false;
            }

            $element.off(pointerMove, touchmove);
            $element.off(pointerUp, $scope.toggle);
            $element.on(pointerDown, touchdown);

            // Fire external onChange callback function
            if (!!$scope.onChange) {
              $scope.onChange({value: $scope.ngModel});
            }

            $scope.$apply();
            event.stopPropagation(); //disable mousedown on touch devices

          }
          // <FALLBACK> Toggle on touch devices
          // incase draggable area is way too small for fat fingers
          else if ($scope.isTouch) {
            toggle(event);
          }
        }

        /**
         * Toggle this main directive
         */
        function toggle(event) {

          // ignore toggle event when this is locked
          if ($scope.isLocked()) {
            return;
          }

          // ignore user event if there is a one-way lock
          // double assurance
          if (typeof $scope.lockToState !== 'undefined') {
            if (($scope.lockToState && $scope.ngModel) ||
                (!$scope.lockToState && !$scope.ngModel)
            ) {

              return;
            }
          }

          $scope.ngModel = !$scope.ngModel;

          // Fire external onChange callback function
          if (!!$scope.onChange) {
            $scope.onChange({value: $scope.ngModel});
          }

          // update listeners
          $element.off(pointerMove, touchmove);
          $element.off(pointerUp, $scope.toggle);
          $element.on(pointerDown, touchdown);

          $scope.$apply();
          event.stopPropagation(); //disable mousedown on touch devices
          event.preventDefault();
        }

      }])
  /**
   * Directive declaration
   */
    .directive('bentoToggle', [function () {

      return {
        restrict   : 'A',
        replace    : true,
        require    : '^ngModel',
        scope      : {
          ngModel    : '=',
          onChange   : '&',
          lockToState: '=',
          isLocked   : '&'
        },
        controller : 'bentoToggleController',
        templateUrl: '../templates/toggle/bento-toggle.html'
      };
    }]);


})(window, window.angular);
