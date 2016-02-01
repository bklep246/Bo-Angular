/**
 * Bento Wizard NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.5.2
 * @date 07/11/2014
 *
 * 18/2/2015
 * `currentStep` is now using two-way binding
 *
 * 07/11/2014
 * Variable validation on `currentStep`
 *
 * 22/10/2014
 * Dynamic step feature is added
 *
 * 02/06/2014
 *
 * Bug fix where 'most-right' is miss assigned when selected step 5 -> step 2 on a three cell scenario
 * New skin applied
 * Localization is added
 * current-step feature is added
 *
 */

(function (window, angular, undefined) {
  'use strict';

  /**
   * @ngdoc directive
   * @name bentoWizrd
   * @description
   *
   * # bentoWizrd
   *
   * The `bentoWizrd` directive provides directive objects to mimic off canvas menue behavior.
   *
   *
   */

  // Global setting variables

  var GAP = 37;  // in pixels
  var WINDOW_RESIZE_DELAY = 300; // in milliseconds
  var MAX_STEP_BOX_WIDTH = 350; // in pixels
  var STEP_PADDING = 0;  // in pixels

// Define bentoUI App object
  angular.module('bento.wizard', ['ui.bootstrap', 'pascalprecht.translate', 'bento.services', 'bento.cookie'])
    .config(['$translateProvider', '$bentoTranslateLoaderProvider', '$bentoJSRootProvider', '$bentoCookieProvider',
      function ($translateProvider, $bentoTranslateLoaderProvider, $bentoJSRootProvider, $bentoCookieProvider) {

        // Project Concert language support
        var language = $bentoCookieProvider.getCookie('uiCulture', 'en');

        // Setup provider
        $bentoJSRootProvider.configAngularTranslateProvider(
          'bento-wizard',
          $translateProvider,
          $bentoTranslateLoaderProvider,
          language
        );

      }])
    .controller('wizardMainController', ['$scope', '$rootScope', '$element',
      '$attrs', '$transclude', '$timeout', '$window', '$translate', '$log',
      function ($scope, $rootScope, $element, $attrs, $transclude, $timeout, $window, $translate, $log) {
        // initialize variables
        $scope.isLeftArrowDisabled = true;
        $scope.isRightArrowDisabled = true;

        $element.addClass('bento-wizard');

        // Watch Language setting
        $scope.$watch('lang', function () {
          if (!!$scope.lang) {
            $translate.use($scope.lang.toLowerCase());
          }
        });

        //Set

        // For a controller to control to assign the current step
        // to this wizard directive
        if (typeof $scope.currentStep === 'undefined') {
          // Default current step to 0
          $scope.currentStep = 0;
        }
        $scope.previousStep = 0;

        // Set side-arrows true by default
        $scope._useSideArrows = !!(typeof $scope.useSideArrows === 'undefined' || $scope.useSideArrows === 'true');

        // Left and Right Arrow clicks
        $scope.onLeftArrowClick = function () {
          if ($scope.leftIndex >= $scope.displayCount) {
            $scope.$ul.css('margin-left', ($scope.$ul[0].offsetLeft + $element[0].offsetWidth - GAP * 2 + STEP_PADDING) + 'px');
            $scope.leftIndex = $scope.leftIndex - $scope.displayCount;
          } else {
            $scope.$ul.css('margin-left', '0px');
            $scope.leftIndex = 0;
          }

          $scope.updateLeftRightArrows();
        };

        $scope.onRightArrowClick = function () {
          if (($scope.numSteps - $scope.leftIndex - $scope.displayCount) >= $scope.displayCount) {

            $scope.$ul.css('margin-left', ($scope.$ul[0].offsetLeft - $element[0].offsetWidth + GAP * 2 - STEP_PADDING) + 'px');
            $scope.leftIndex = $scope.leftIndex + $scope.displayCount;
          } else {
            $scope.$ul.css('margin-left', (-$scope.$ul[0].offsetWidth + $element[0].offsetWidth - GAP * 2 + STEP_PADDING) + 'px');
            $scope.leftIndex = $scope.numSteps - $scope.displayCount;
          }

          $scope.updateLeftRightArrows();
        };

        // Previous and Next button clicks
        $scope.onPreviousClick = function () {
          if ($scope.currentStep === 0) {
            return;
          }

          $scope.currentStep = parseInt($scope.currentStep, 10) - 1;
        };

        $scope.onNextClick = function () {
          if ($scope.currentStep === $scope.stepList.length - 1) {
            return;
          }

          $scope.currentStep = parseInt($scope.currentStep, 10) + 1;
        };

        // Done button click
        $scope.onDoneClick = function () {
          $scope.onFinish();
        };

        // A step is clicked on the top step nav
        $scope.onStepClick = function (step) {

          // ignore the step that is already selected
          if (step === $scope.currentStep) {
            return;
          }

          $scope.currentStep = step;
        };

      }])
    .directive('bentoWizard', [
      '$compile',
      '$timeout',
      '$window',
      '$log',
      function ($compile, $timeout, $window, $log) {
        return {
          restrict  : 'AEC',
          replace   : false,
          scope     : {
            onChange            : '&', // Fire onChange() when a wizard step is changed.
            onFinish            : '&', // Fire onFinish() when the whole wizard is finished
            useSideArrows       : '@', // Check if we need to use arrows
            currentStep         : '=?', // Listen to step value change
            lang                : '=', // An exposed variable to
            demoMode            : '@', // A mode to disable focus
            isDoneButtonDisabled: '=', // Expose showButtonDone
            hideDefaultButtons         : '=', // Hide "Previous", "Next" and "Done" buttons
            hidePreviousButton  : '=', // Hide "Previous" button
            hideNextButton      : '=', // Hide "Next" button
            hideDoneButton      : '='  // Hide "Done" button
          },
          controller: 'wizardMainController',
          link      : function (scope, element, attrs) {

            element.addClass('ng-hide');

            // Render wizard when all rendering is done
            $timeout(function () {

              // Basic rendering
              // update the step layouts the first time
              $timeout(renderStepWidth, 1);
              // need to re-render the second path in case the scroll bar showed/hided
              $timeout(renderStepWidth, 2);

              // Watch element width and render it's width
              var resizeTimeout = 0;
              angular.element($window).bind('resize', function (e) {
                // Set a timeout to minimize performance issue
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(renderStepWidth, WINDOW_RESIZE_DELAY);
              });

              // localization
              var nextButtonLabel = "{{ 'BUTTON_NEXT' | translate }}";
              var previousButtonLabel = "{{ 'BUTTON_PREVIOUS' | translate }}";
              var doneButtonLabel = "{{ 'BUTTON_DONE' | translate }}";

              // Content pointers
              scope.content = angular.element(element[0].querySelector('.contents'));
              scope.contents = scope.content.children();

              // Add previous and next buttons
              var buttonNext = angular.element(
                '<button role="button" class="btn btn-primary pull-right" ' +
                'role="button" aria-label="' + nextButtonLabel + '" ' +
                'ng-show="showButtonNext" ng-click="onNextClick()"' +
                'ng-if="!hideDefaultButtons && !hideNextButton">' +
                nextButtonLabel +
                ' <i class="glyphicons chevron-right"></i></button>'
              );
              var buttonPrevious = angular.element(
                '<button role="button" class="btn btn-default pull-left" ' +
                'role="button" aria-label="' + previousButtonLabel + '" ' +
                'ng-show="showButtonPrevious" ng-click="onPreviousClick()"' +
                'ng-if="!hideDefaultButtons && !hidePreviousButton">' +
                '<i class="glyphicons chevron-left"></i> ' +
                previousButtonLabel +
                '</button>'
              );
              var buttonDone = angular.element(
                '<button class="btn btn-primary pull-right" ' +
                'role="button" aria-label="' + doneButtonLabel + '"' +
                'ng-disabled="isDoneButtonDisabled"' +
                'ng-show="showButtonDone" ng-click="onDoneClick()"' +
                'ng-if="!hideDefaultButtons && !hideDoneButton">' +
                doneButtonLabel +
                '</button>'
              );
              scope.$buttonNext = buttonNext;
              scope.$buttonPrevious = buttonPrevious;
              scope.$buttonDone = buttonDone;

              // Add top left and right arrows
              var arrowLeft = angular.element(
                '<button class="wizard-arrow arrow-left"' +
                ' role="button" aria-label="Left Arrow"' +
                ' alt="Show previous step headers"' +
                ' ng-disabled="isLeftArrowDisabled"' +
                ' ng-click="onLeftArrowClick()">' +
                '</button>'
              );
              var arrowRight = angular.element(
                '<button class="wizard-arrow arrow-right"' +
                ' role="button" aria-label="Right Arrow"' +
                ' alt="Show next step headers"' +
                ' ng-disabled="isRightArrowDisabled"' +
                ' ng-click="onRightArrowClick()">' +
                '</button>'
              );

              scope.$arrowLeft = arrowLeft;
              scope.$arrowRight = arrowRight;

              // Add the two buttons to content
              scope.content.after(buttonDone);
              scope.content.after(buttonNext);
              scope.content.after(buttonPrevious);
              scope.content.after(arrowLeft);
              scope.content.after(arrowRight);

              // Compile ng-clicks
              $compile(buttonDone)(scope);
              $compile(buttonNext)(scope);
              $compile(buttonPrevious)(scope);
              $compile(arrowLeft)(scope);
              $compile(arrowRight)(scope);

              // POST DOM injection
              // Update model reference to be used in controller
              scope.$ul = angular.element(element[0].querySelector('.steps'));
              scope.stepList = scope.$ul.children();

              // Add CSS class to the main container
              element.addClass('bento-wizard');

              // Assign Step Class Name with bento-wizard name spage
              // $ul.addClass('bento-wizard-steps');
              scope.$ul.wrap('<div class="bento-wizard-steps" />');

              processSteps();

              // Add click event listeners to steps
              //scope.stepList.on('click', onStepClick);

              // init buttons
              scope.showButtonNext = (scope.stepList.length !== 1);
              scope.showButtonPrevious = false;
              scope.showButtonDone = (scope.stepList.length === 1);

              // setup content
              scope.content.attr('tabindex', -1);

              // Start to watch the currentStep variable change and
              // update wizards GUI
              scope.$watch('currentStep', function (v) {
                updateStep();
              });

              // Watch the count to the steps to see if there is anything changed
              scope.$watch(function () {
                  return scope.$ul.children().length;
                },
                function (newVal, oldVal) {
                  // Update Step List
                  updateStep();

                  // Add event listeners and classes to newly restored steps
                  processSteps();

                  // Need to re-render the width of the steps when adding or removing a step
                  renderStepWidth();
                });

              // Skin steps
              function processSteps() {
                // insert prefix number to a step <li> where it's not initialized
                for (var i = 0; i < scope.stepList.length; i++) {
                  var $li = angular.element(scope.stepList[i]);
                  if (!$li.hasClass('bento-wizard-step')) {
                    $li.addClass('bento-wizard-step');
                    $li.append(
                      '<div class="arrow-bg"></div>' +
                      '<div class="arrow-line arrow-line-top"></div>' +
                      '<div class="arrow-line arrow-line-bottom"></div>'
                    );

                    // Add click event handler
                    $li.on('click', onStepClick);
                  }
                }
              }

              // Click function
              function onStepClick(event) {
                var index = 0;
                for (var i = 0; i < scope.stepList.length; i++) {
                  if (scope.stepList[i] === event.currentTarget) {
                    index = i;
                    break;
                  }
                }

                scope.onStepClick(index);
                scope.$apply();

              }

              // Show the whole module
              element.removeClass('ng-hide');
            }); // End of $timeout

            // Private function
            function updateStep() {
              var step = parseInt(scope.currentStep, 10);

              // Make sure the new step is a number
              step = isNaN(step) ? 0 : step;

              // Update the step and content references
              scope.stepList = scope.$ul.children();
              scope.contents = scope.content.children();

              // Reset currentStep if it is out of range
              if (scope.currentStep >= scope.stepList.length) {
                scope.currentStep = scope.stepList.length - 1;
              }

              // Fire event and forward step variable over
              if (typeof scope.onChange !== 'undefined') {
                if (scope.onChange({step: step}) === false) {
                  // Bypassed wizard update by user
                  scope.currentStep = scope.previousStep;
                  return;
                }
              }

              var previous$li;
              for (var i = 0; i < scope.stepList.length; i++) {
                var $li = angular.element(scope.stepList[i]);
                $li.removeClass('previous');
                if (i === step) {
                  $li.addClass('selected');
                  if (typeof previous$li !== 'undefined') {
                    previous$li.addClass('previous');
                  }
                } else {
                  $li.removeClass('selected');
                }

                previous$li = $li;
              }

              previous$li = null;

              //Warning message when the current step is out of the current given range.
//                if (step >= scope.stepList.length || step < 0) {
//
//                }

              // show & hide buttons
              scope.showButtonNext = !!((scope.stepList.length > 1) && (step < scope.stepList.length - 1));
              scope.showButtonPrevious = !!((scope.stepList.length > 1) && (step > 0));
              scope.showButtonDone = !!((scope.stepList.length === 1) || (step === scope.stepList.length - 1));

              // show & hide contents
              for (var j = 0; j < scope.contents.length; j++) {
                var $content = angular.element(scope.contents[j]);
                if (j === step) {
                  $content.removeClass('ng-hide');
                } else {
                  $content.addClass('ng-hide');
                }
              }

              // Focus on the panel after rendering
              if (typeof scope.demoMode === 'undefined' || scope.demoMode === false || scope.demoMode === 'false') {
                $timeout(function () {
                  scope.content[0].focus();
                });
              }

              // Bypass the update when directive step state is changed back from
              // calling onChange(step)

              updateStepContainerOffset();

              scope.previousStep = scope.currentStep;
            }

            // Update step location
            function updateStepContainerOffset() {
              scope.currentStep = parseInt(scope.currentStep, 10);

              if (isNaN(scope.currentStep)) {
                $log.warn('Wizard: `current-step` is not an integer ');
                scope.currentStep = 0;
              }

              // Variables to be used for calculation
              var offsetWidth = (element.hasClass('side-arrows')) ?
              element[0].offsetWidth - GAP * 2 : element[0].offsetWidth;
              var stepArray = scope.stepList;
              var previousObj = (scope.currentStep === 0) ?
                null :
                stepArray[scope.currentStep - 1];
              var currentStepObj = stepArray[scope.currentStep];
              var nextObj = (scope.currentStep === stepArray.length - 1) ?
                null :
                stepArray[scope.currentStep + 1];
              var containerLeft = currentStepObj.offsetLeft - scope.$ul[0].offsetLeft;
              var left = (typeof previousObj !== 'undefined' && previousObj !== null) ?
                previousObj.offsetLeft :
                0;
              var right = (typeof nextObj !== 'undefined' && nextObj !== null) ?
              offsetWidth - nextObj.offsetLeft - nextObj.offsetWidth :
                0;
              var currentLeft = currentStepObj.offsetLeft;
              var currentRight = offsetWidth - currentStepObj.offsetLeft - currentStepObj.offsetWidth;
              var marginLeft;

              // find the left index
              scope.leftIndex = 0;
              for (var i = 0; i < stepArray.length; i++) {
                var step = stepArray[i];
                if (step.offsetLeft <= 0 && step.offsetLeft + step.offsetWidth > 0) {
                  scope.leftIndex = i;
                  break;
                }
              }

              // Store leftIndex to model for left and right arrows to use

              // Snap the container to grid from the left
              // Need to start with the second step object
              if (scope.leftIndex > 0) {
                marginLeft = -stepArray[scope.leftIndex].offsetLeft + scope.$ul[0].offsetLeft;
              } else {
                marginLeft = 0;
              }

              // Better UX
              // Check if the next or the previous step object is out side of the OL
              // Bring it bring if not
              if (left < 0) {
                marginLeft = -previousObj.offsetLeft + scope.$ul[0].offsetLeft;
                scope.leftIndex = scope.currentStep - 1;
              } else if (right < 0) {
                marginLeft = -nextObj.offsetLeft + scope.$ul[0].offsetLeft - nextObj.offsetWidth + offsetWidth;
                scope.leftIndex = scope.currentStep + 2 - scope.displayCount;
              }

              // Again double check if the current object is in the container viewport or not
              // If not, bring it in.
              if (currentLeft < 0 && scope.leftIndex > 0) {
                marginLeft = -containerLeft;
                scope.leftIndex--;

              } else if (currentRight < 0) {
                marginLeft = -(containerLeft + currentStepObj.offsetWidth - offsetWidth);
                scope.leftIndex = scope.currentStep - scope.displayCount + 1;
              }

              // Eliminate right empty spaces
              if (scope.leftIndex + scope.displayCount > scope.numSteps &&
                scope.displayCount <= scope.numSteps) {
                marginLeft = -scope.$ul[0].offsetWidth + element[0].offsetWidth + STEP_PADDING;
                marginLeft = (element.hasClass('side-arrows')) ? marginLeft - GAP * 2 : marginLeft;
                scope.leftIndex = scope.numSteps - scope.displayCount;
              }

              scope.$ul.css('margin-left', marginLeft + 'px');

              scope.updateLeftRightArrows();
            }

            // Render boxes' width
            function renderStepWidth() {
              var width = element[0].offsetWidth;

              // Set the total step object to be displayed
              // in wizard viewport based on its width
              var numSteps = scope.stepList.length;
              var displayCount = (numSteps > 4) ? 4 : numSteps; // Default step count

              // Refine displayCount based on the width and numSteps
              if (width < 720 && displayCount > 2) {
                displayCount = 2;
              } else if (width < 960 && displayCount > 3) {
                displayCount = 3;
              } else if (MAX_STEP_BOX_WIDTH * displayCount + (displayCount - 1 ) * STEP_PADDING < width &&
                numSteps > displayCount) {
                displayCount = Math.ceil(width / MAX_STEP_BOX_WIDTH);
              }

              // Update displayCount for controller to use
              scope.displayCount = displayCount;
              // Add numSteps for controller to use
              scope.numSteps = numSteps;

              if (scope._useSideArrows) {
                if (displayCount < numSteps) {
                  element.addClass('side-arrows');
                  width = element[0].offsetWidth - GAP * 2;
                } else {
                  element.removeClass('side-arrows');
                }
              }

              // Set list container width based on the total step count
              // and their widths
              var boxWidth = (width - (displayCount - 1) * STEP_PADDING) / displayCount;
              scope.stepList = scope.$ul.children();

              //Cap the step box width
              boxWidth = (boxWidth > MAX_STEP_BOX_WIDTH) ? MAX_STEP_BOX_WIDTH : boxWidth;

              scope.$ul.css('width', (scope.stepList.length * (boxWidth + STEP_PADDING)) + "px");
              scope.stepList.css('width', boxWidth + 'px');

              //Reset all height classes
              //angular.element(scope.stepList).removeClass('flat');
              angular.element(scope.stepList).removeClass('narrow');
              //scope.$arrowLeft.removeClass('flat');
              //scope.$arrowRight.removeClass('flat');

              //if (boxWidth > 310) {
              angular.element(scope.stepList).addClass('flat');
              scope.$arrowLeft.addClass('flat');
              scope.$arrowRight.addClass('flat');
              //} else if (boxWidth < 220) {
              // angular.element(scope.stepList).addClass('narrow');
              //}

              updateStepContainerOffset();
            }

            // Enable and Disable left and right arrows based on current
            // step position
            scope.updateLeftRightArrows = function () {

              if (typeof scope.displayCount === 'undefined') {
                return;
              }

              if (scope.leftIndex === 0) {
                scope.$arrowLeft.attr('disabled', 'disabled');
              } else {
                scope.$arrowLeft.removeAttr('disabled');
              }

              if (scope.leftIndex + scope.displayCount >= scope.numSteps) {
                scope.$arrowRight.attr('disabled', 'disabled');
              } else {
                scope.$arrowRight.removeAttr('disabled');
              }

              angular.element(scope.stepList).removeClass('most-right');

              if (element[0].offsetWidth <= scope.displayCount * MAX_STEP_BOX_WIDTH) {
                angular.element(scope.stepList[scope.leftIndex + scope.displayCount - 1]).addClass('most-right');
              }
            };
          }
        };
      }]);
})(window, window.angular);
