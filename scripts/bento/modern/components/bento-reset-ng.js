/**
 * Bento Reset NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 28/10/2014
 *
 * 28/10/2014
 * - removing controller and adding ngModel require
 *
 * 03/06/2014
 *
 * Initial build
 *
 */

(function (window, angular, undefined) {
  'use strict';

// Define bentoUI App object
  angular.module('bento.reset', [])

  /**
   * Main Bento Reset factory
   */
    .factory('$bentoResetFactory', [
      function () {

        /**
         * Align the clear button to the input field
         * @param inputElement
         * @param clearButton
         */
        var alignClearButton = function (inputElement, clearButton) {

          // set left
          clearButton.css('left',
              (inputElement[0].offsetWidth - clearButton[0].offsetWidth + inputElement[0].offsetLeft) + 'px'
          );

          // set top
          clearButton.css('top',
              (inputElement[0].offsetTop + (inputElement[0].offsetHeight - clearButton[0].offsetHeight) * 0.5) + 'px'
          );

        };

        /**
         * Show and hide clear button and adjust input fields right padding
         * @param inputElement
         * @param clearButton
         * @param value
         */
        var showAndHideButton = function (inputElement, clearButton, value) {

          // Hide clearButton where is the input field is empty
          // or it is not focused
          if (typeof value === 'undefined' || value.length === 0 || document.activeElement !== inputElement[0]) {
            clearButton.addClass('hide');
            inputElement.removeClass('bento-reset-dirty');

            window.removeEventListener('resize', windowResizeEventHandler);
          } else if (clearButton.hasClass('hide')) {

            clearButton.removeClass('hide');
            inputElement.addClass('bento-reset-dirty');
            // Realign clear button is there is any change
            alignClearButton(inputElement, clearButton);

            window.addEventListener('resize', windowResizeEventHandler);
          }

          // Private event handler
          // Check clear button location when window is resizing
          function windowResizeEventHandler(event) {
            alignClearButton(inputElement, clearButton);
          }

        };

        // Return all services
        return {
          alignClearButton: alignClearButton,
          showAndHideButton: showAndHideButton
        };

      }])
  /**
   * Directive: Bento Reset
   */
    .directive('bentoReset', [
      '$window', '$timeout', '$bentoResetFactory',
      function ($window, $timeout, $bentoResetFactory) {

        return {
          restrict: 'A',
          require: 'ngModel',
          replace: false,
          scope: {
            ngModel: '=', // Value to the input field
            glyphicon: '@' // is used to override clearButton icon using Glyphicon Pro icons
          },
          link: function(scope, element,attrs,controller){
            var iconName = (!!scope.glyphicon) ? scope.glyphicon : 'remove_2';
            var clearButton = angular.element('<div class="bento-reset-close-button hide glyphicons ' +
                                              iconName +
                                              '" tabindex="-1"></div>');

            // Add class
            element.addClass('bento-reset');

            scope.$watch('ngModel', function (newVal, oldVal) {
              $bentoResetFactory.showAndHideButton(element, clearButton, newVal);
            });

            // Listen to input field `change` and `focus` and show / hide clear button
            element.on('keyup focus', function (event) {
              $bentoResetFactory.showAndHideButton(element, clearButton, scope.ngModel);
            });

            // Listen to input field blur
            // update: `event.relatedTarget` is not available on `blur` use `focusout` instead with IE9
            element.on('focusout', function (event) {
              if(event.relatedTarget !== clearButton[0]){
                clearButton.addClass('hide');
              }
            });

            // On clear button click
            // Clear input field
            clearButton.on('click', function (event) {
              // $log.debug('button clicked');
              scope.ngModel = '';
              scope.$apply();
            });

            // Initialize the location of the clear button
            $timeout(function () {
              $bentoResetFactory.alignClearButton(element, clearButton);
            });

            // Add clearButton after the input field
            element.after(clearButton);
          }
        };

      }
    ]);

})(window, window.angular);
