/**
 * Bento Splitter Group NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.4.3
 * @date 16/10/2014
 *
 * 09/02/2015
 * New Features:
 * - Added `left-max-width` and `right-max-width` parameters (optional)
 *
 * 16/10/2014
 * New Features:
 * - Event Tracking dispatcher is added
 *
 * 25/09/2014
 * Bug Fixes:
 * - Does not collapse when click on the handle
 *
 * 12/09/2014
 * New Features:
 * - Attribute `no-collapse` is added to support Transferbox
 *
 * 23/07/2014
 * New Features:
 * - Right panel is added
 * - Notification service is added
 * - `openLeft`, `closeLeft`, `openRight` and `closeRight` notifications are added to the BSG
 *
 * 17/07/2014
 * New Features:
 * - `onResize` callback is added
 *
 *
 * 08/05/2014
 *
 * Initial build
 *
 *
 *
 */
(function (window, angular, undefined) {

  'use strict';

  var bentSplitterGroupApp = angular.module('bento.splittergroup', ['bento.services']);

  bentSplitterGroupApp
  /**
   * A notification factory to let the controllers in the left, middle and right panels to
   * communicate with each other
   *
   * This also helps with Left and Right panel collapses and expansions
   */
    .factory('splitterGroupNotification', function () {
      var notificationStack = [];
      /**
       * Add a splitter group notification
       * @param nName - Notification name
       * @param func - Notification function
       * @param uid - (Optional) unique ID
       */
      var addNotification = function (nName, func, uid) {
        // Check if notification with `nName` exists or create a new `nName` stack
        if (typeof notificationStack[nName] === 'undefined') {
          notificationStack[nName] = [];
        }

        notificationStack[nName].push(
          {
            func: func,
            uid : uid
          }
        );
      };

      /**
       * Remove a splitter group notification
       * @param nName - Notification name
       * @param func - Notification function
       * @param uid - (Optional) unique ID
       */
      var removeNotification = function (nName, func, uid) {
        // If `nName` notification does not exist
        // Do nothing.
        if (typeof notificationStack[nName] === 'undefined') {
          return;
        }

        var nNameStack = notificationStack[nName];

        var index = 0;
        var notification;
        // Remove the matching notification
        while (index < nNameStack.length) {
          notification = nNameStack[index];
          if (notification.func === func &&
            notification.uid === uid) {
            nNameStack.splice(index, 1);
          } else {
            index++;
          }
        }
      };

      /**
       * Notify through the notification center
       * @param nName - Notification name
       * @param uid - (Optional)
       * @param data - (Optional)
       */
      var notify = function (nName, uid, data) {
        // If `nName` notification does not exist
        // Do nothing.
        if (typeof notificationStack[nName] === 'undefined') {
          return;
        }

        var nNameStack = notificationStack[nName];

        for (var i = 0; i < nNameStack.length; i++) {
          var notification = nNameStack[i];
          if (typeof uid === 'undefined' ||
            uid === null ||
            notification.uid === uid
          ) {
            notification.func(data);
          }
        }
      };

      // Regiter notification functions to factory
      return {
        addNotification   : addNotification,
        removeNotification: removeNotification,
        notify            : notify
      };
    })
    .factory('splitterGroupMainHelper', ['$window', '$timeout', function ($window, $timeout) {

      /**
       * This is a port to angularJS v1.2.11 and up $$rAF for temporary use
       * @param callBackFunc
       * @returns {Function}
       * @constructor
       */
      var RAFProvider = function (callBackFunc) {

        var requestAnimationFrame = $window.requestAnimationFrame ||
          $window.webkitRequestAnimationFrame ||
          $window.mozRequestAnimationFrame;

        var cancelAnimationFrame = $window.cancelAnimationFrame ||
          $window.webkitCancelAnimationFrame ||
          $window.mozCancelAnimationFrame ||
          $window.webkitCancelRequestAnimationFrame;

        var rafSupported = !!requestAnimationFrame;
        if (rafSupported) {
          var id = requestAnimationFrame(callBackFunc);
          return function () {
            cancelAnimationFrame(id);
          };
        } else {
          var timer = $timeout(callBackFunc, 16.66, false); // 1000 / 60 = 16.666
          return function () {
            $timeout.cancel(timer);
          };
        }
      };

      /**
       * parse side bar width from a string
       * @param element
       * @param width
       * @returns number
       */
      var parseWidth = function (element, width) {
        if (typeof width === 'number') {
          return width;
        } else if (typeof width === 'undefined') {
          return -1;
        }

        var widthType = width.search('%') > -1 ? '%' : 'px';
        var widthInt = parseInt(width);

        if (widthType === '%') {
          return element[0].offsetWidth * widthInt / 100;
        }

        return widthInt;
      };

      return {
        rAF       : RAFProvider,
        parseWidth: parseWidth
      };
    }])
  /**
   * Main Controller to Splitter Group directive
   */
    .controller('mainController', [
      '$scope',
      '$element',
      '$window',
      'splitterGroupMainHelper',
      '$bentoServices',
      function ($scope, $element, $window, splitterGroupMainHelper, $bentoServices) {

        // Check if the browser is IE 9
        if ($bentoServices.getIEVersion() === 9) {
          $element.addClass('ie9');
        }

        $element.addClass('bento-splitter-group');

        // Add `no-collapse` class when this directive is not collapsable
        if (!!$scope.noCollapse()) {
          $element.addClass('no-collapse');
        }

        // Determine if user is clicking on the left handle or not

        /**
         * Excute mouse click
         * @param event
         */
        $scope.onHandleClick = function (event) {

          // Bypass click when this directive is not collapsable
          if (!!$scope.noCollapse()) {
            return;
          }

          if ($scope.actionOnLeft) {
            $element.toggleClass('opened-left');
          } else {
            $element.toggleClass('opened-right');
          }

          if ($element.hasClass('opened-left') && $scope.actionOnLeft) {

            $scope.splitterLeft.css('left', '0');
            $scope.splitterMain.css('left', $scope.leftWidth);
            $scope.splitHandleLeft.css('left', $scope.leftWidth);

          } else if ($element.hasClass('opened-right') && !$scope.actionOnLeft) {
            $scope.splitterRight.css('right', '0');
            $scope.splitterMain.css('right', $scope.rightWidth);
            $scope.splitHandleRight.css('right', $scope.rightWidth);

          } else {
            if ($scope.actionOnLeft) {
              $scope.splitterLeft.css('left', '-' + $scope.leftWidth);
              $scope.splitterMain.css('left', '0');
              $scope.splitHandleLeft.css('left', '0');
            } else {
              $scope.splitterRight.css('right', '-' + $scope.rightWidth);
              $scope.splitterMain.css('right', '0');
              $scope.splitHandleRight.css('right', '0');
            }
          }

        };
        //Initialize window resize elements
        $scope.leftMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.leftMaxWidth);
        $scope.rightMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.rightMaxWidth);
        var $w = angular.element($window);

        // Adding resize listener if there is a maxDraggable variable assigned
        if ($scope.leftMaxWidthPx > -1 || $scope.rightMaxWidthPx > -1) {
          $w.on('resize', onWindowsResize);
          $scope.$on('$destroy', function () {
            $w.off('resize', onWindowsResize);
          });
        }

        /**
         * check the width of left and right panels to make sure they are not oversized based on the
         * max draggable settings
         * @param $event
         */
        function onWindowsResize($event) {
          $scope.leftMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.leftMaxWidth);
          $scope.rightMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.rightMaxWidth);

          if ($scope.leftMaxWidthPx > -1) {
            if (parseInt($scope.leftWidth) > $scope.leftMaxWidthPx) {
              $scope.leftWidth = $scope.leftMaxWidthPx + 'px';
              $scope.splitterLeft[0].style.width = $scope.leftWidth;
            }

            if ($scope.splitHandleLeft[0].offsetLeft > $scope.leftMaxWidthPx) {
              $scope.splitterMain[0].style.left =
                $scope.splitHandleLeft[0].style.left =
                  $scope.leftWidth;
            }
          }

          if ($scope.rightMaxWidthPx > -1) {
            if (parseInt($scope.rightWidth) > $scope.rightMaxWidthPx) {
              $scope.rightWidth = $scope.rightMaxWidthPx + 'px';
              $scope.splitterRight[0].style.width = $scope.rightWidth;
            }

            if ($element[0].offsetWidth - $scope.splitHandleRight[0].offsetLeft - $scope.splitHandleRight[0].offsetWidth > $scope.leftMaxWidthPx) {
              $scope.splitterMain[0].style.right =
                $scope.splitHandleRight[0].style.right =
                  $scope.rightWidth;
            }
          }
        }

        //Initialize dragging variables
        var draggingClassTimeout;
        var isDragging = false;
        var lastMouseX; // is used to track mose X movement
        var initialHandleX;
        var elementWidth;
        var handleWidth;

        /**
         * When the mouse is pressed down on the handle
         * @param event
         */
        $scope.onHandleDown = function (event) {
          $scope.actionOnLeft = event.currentTarget.className.search('handle-left') !== -1;
          elementWidth = $element[0].offsetWidth;
          handleWidth = (!!$scope.splitHandleLeft) ? $scope.splitHandleLeft[0].offsetWidth : $scope.splitHandleRight[0].offsetWidth;

          //Calculate lastMouseX
          lastMouseX = event.screenX;
          initialHandleX = ($scope.actionOnLeft) ?
            $scope.splitHandleLeft[0].offsetLeft :
          $scope.splitHandleRight[0].offsetLeft + $scope.splitHandleRight[0].offsetWidth;

          $element.addClass('unselectable');

          //start to track mouse move
          //touch devices are disabled for now.
          if (!!$scope.resizable() && event.type === 'mousedown') {
            $w.on(' touchmove mousemove', $scope.onHandleMove);
            draggingClassTimeout = setTimeout(function () {
              if ($scope.actionOnLeft) {
                $element.addClass('dragging-left');
              } else {
                $element.addClass('dragging-right');
              }
            }, 300);
          }
          //track mouse up
          $w.one('touchend mouseup', $scope.onHandleUp);
        };

        /**
         * When mouse is released within the window
         * @param event
         */
        $scope.onHandleUp = function (event) {
          clearTimeout(draggingClassTimeout);
          $element.removeClass('dragging-left');
          $element.removeClass('dragging-right');

          //If the user didn't drag mouse pointer and released it inside of the splitter
          //It would be treated as a click
          if (!isDragging && event.target.className.search('bento-splitter-handle') !== -1 && !$scope.noCollapse()) {
            $scope.onHandleClick(event);
            // Dispatch click tracking event
            $scope.eventTracking({
              eventName: 'splitter_group_click'
            });
          } else {
            //Normalize leftWidth
            if ($scope.actionOnLeft) {
              var left = $scope.splitHandleLeft[0].offsetLeft;
              left = (left < 50) ? 0 : left;
              // update left width

              $scope.leftWidth = (left < 50) ? $scope.leftWidth : left + 'px';

              // Close
              if (left === 0) {
                $element.removeClass('opened-left');
                $scope.splitterLeft.css('left', '-' + $scope.leftWidth);
                $scope.splitterLeft.css('width', $scope.leftWidth);
                $scope.splitterMain.css('left', '0');
                $scope.splitHandleLeft.css('left', '0');
                handleTargetX = 0;
              } else {
                $element.addClass('opened-left');
              }
            } else {
              var right = elementWidth - $scope.splitHandleRight[0].offsetLeft - $scope.splitHandleRight[0].offsetWidth;
              right = (right < 50 + handleWidth) ? 0 : right;
              // update left width

              $scope.rightWidth = (right < 50) ? $scope.rightWidth : right + 'px';

              // Close
              if (right === 0) {
                $element.removeClass('opened-right');
                $scope.splitterRight.css('right', '-' + $scope.rightWidth);
                $scope.splitterRight.css('width', $scope.rightWidth);
                $scope.splitterMain.css('right', '0');
                $scope.splitHandleRight.css('right', '0');
                handleTargetX = 0;
              } else {
                $element.addClass('opened-right');
              }
            }
            // Dispatch drag tracking event
            $scope.eventTracking({
              eventName: 'splitter_group_drag'
            });
          }

          $element.removeClass('unselectable');
          //stop move
          $w.off('touchmove mousemove', $scope.onHandleMove);

          //turn on down
          if ($scope.actionOnLeft) {
            $scope.splitHandleLeft.one('touchstart mousedown', $scope.onHandleDown);
          } else {
            $scope.splitHandleRight.one('touchstart mousedown', $scope.onHandleDown);
          }

          //reset dragging flag
          isDragging = false;

          // Fire onResize Callback
          if (!!$scope.onResize) {
            $scope.onResize({
              side: ($scope.actionOnLeft) ? 'left' : 'right'
            });
          }
        };

        var handleTargetX;
        var lastHandleX = 0;
        var dX;

        //Animate dragging using window.requestAnimationFrame for optimal performance
        var animateDragging = function () {

          if (handleTargetX > 0 && dX !== 0) {

            if ($scope.actionOnLeft) {
              $scope.splitterMain[0].style.left =
                $scope.splitHandleLeft[0].style.left =
                  $scope.splitterLeft[0].style.width = handleTargetX + 'px';
            } else {
              $scope.splitterMain[0].style.right =
                $scope.splitHandleRight[0].style.right =
                  $scope.splitterRight[0].style.width = handleTargetX + 'px';
            }

            // Fire onResize Callback
            if (!!$scope.onResize) {
              $scope.onResize({
                side: ($scope.actionOnLeft) ? 'left' : 'right'
              });
            }
          }

          if (isDragging) {
            splitterGroupMainHelper.rAF(animateDragging);
          }
        };

        /**
         * Track on window mousemove
         * @param event
         */
        $scope.onHandleMove = function (event) {
          var currentMouseX = event.screenX;

          // Calculate dX for rendering
          dX = currentMouseX - lastHandleX;
          lastHandleX = currentMouseX;

          if (lastMouseX !== currentMouseX) {

            dX = currentMouseX - lastMouseX;
            handleTargetX = (initialHandleX + dX);
            handleTargetX = ($scope.actionOnLeft) ? handleTargetX : elementWidth - handleTargetX;
            handleTargetX = (handleTargetX < 0) ? 0 : handleTargetX;
            handleTargetX = (handleTargetX > elementWidth - handleWidth) ? elementWidth - handleWidth : handleTargetX;

            // Check draggable area
            if ($scope.actionOnLeft && !!$scope.splitterRight &&
              handleTargetX > $scope.splitHandleRight[0].offsetLeft - handleWidth) {

              handleTargetX = $scope.splitHandleRight[0].offsetLeft - handleWidth;

            } else if (!$scope.actionOnLeft && !!$scope.splitterLeft &&
              handleTargetX > elementWidth - $scope.splitHandleLeft[0].offsetLeft - handleWidth * 2) {

              handleTargetX = elementWidth - $scope.splitHandleLeft[0].offsetLeft - handleWidth * 2;
            }

            if (!isDragging) {
              splitterGroupMainHelper.rAF(animateDragging);
            }

            // Need to 'open' the splitter group when the handle is moved out
            if (handleTargetX > 0 && !$element.hasClass('opened-left') && $scope.actionOnLeft) {
              $element.addClass('opened-left');
              $scope.splitterLeft[0].style.left = '0';
            } else if (handleTargetX > 0 && !$element.hasClass('opened-right') && !$scope.actionOnLeft) {
              $element.addClass('opened-right');
              $scope.splitterRight[0].style.right = '0';
            }

            // Lock handleTargetX if there is a dragging limit here
            if ($scope.actionOnLeft && $scope.leftMaxWidthPx > -1 && handleTargetX > $scope.leftMaxWidthPx) {
              handleTargetX = $scope.leftMaxWidthPx;
            } else if (!$scope.actionOnLeft && $scope.rightMaxWidthPx > -1 && handleTargetX > $scope.rightMaxWidthPx) {
              handleTargetX = $scope.rightMaxWidthPx;
            }

            //flag isDragging
            isDragging = true;
          }
        };
      }])
  /**
   * Splitter Group directive declaration
   */
    .directive('bentoSplitterGroup', [
      '$timeout',
      '$log',
      'splitterGroupNotification',
      'splitterGroupMainHelper',
      function ($timeout, $log, splitterGroupNotification, splitterGroupMainHelper) {

        return {
          restrict  : 'A',
          replace   : false,
          scope     : {
            isLeftCollapsed : '&',  //Default to false if doesn't exist
            isRightCollapsed: '&',  //Default to false if doesn't exist
            resizable       : '&',  //This enables the dragging function to the handle bar
            noCollapse      : '&',  //Making the splitter group to be only resizable but not collapsable on Left
            _leftWidth      : '@leftWidth',  //Set the default width to the left pane
            _rightWidth     : '@rightWidth', //Set the default width to the right pane
            leftMaxWidth    : '@',  //Set max draggable width of the left panel
            rightMaxWidth   : '@',  //Set max draggable width of the right panel
            onResize        : '&',  // Callback for resize
            autoResize      : '&',  // Option to auto-resize the parent container with the content of this SG
            eventTracking   : '&'   // Dispatch external event handlers
          },
          controller: 'mainController',
          link      : function ($scope, $element, $attrs) {
            // Set default width to both left and right
            if (typeof $scope._leftWidth === 'undefined' || $scope._leftWidth === null) {
              $scope.leftWidth = '300px';
            } else {
              $scope.leftWidth = $scope._leftWidth;
            }

            if (typeof $scope._rightWidth === 'undefined' || $scope._rightWidth === null) {
              $scope.rightWidth = '300px';
            } else {
              $scope.rightWidth = $scope._rightWidth;
            }

            // Make sure the intial leftWidth doesn't exceed the leftMaxWidth
            if($scope.leftMaxWidthPx > -1 &&
              splitterGroupMainHelper.parseWidth($element, $scope.leftWidth) > $scope.leftMaxWidthPx){
              $scope.leftWidth = $scope.leftMaxWidthPx + 'px';
            }

            // Make sure the intial rightWidth doesn't exceed the rightMaxWidth
            if($scope.rightMaxWidthPx > -1 &&
              splitterGroupMainHelper.parseWidth($element, $scope.rightWidth) > $scope.rightMaxWidthPx){
              $scope.rightWidth = $scope.rightMaxWidthPx + 'px';
            }

            var mainPaneInner = $element[0].querySelector('.bento-splitter-group-main-inner');

            //Get the two children
            var children = $element.children();
            for (var i = 0; i < children.length; i++) {
              var child = angular.element(children[i]);
              if (child.hasClass('bento-splitter-group-left')) {
                $scope.splitterLeft = child;
              } else if (child.hasClass('bento-splitter-group-main')) {
                $scope.splitterMain = child;
              } else if (child.hasClass('bento-splitter-group-right')) {
                $scope.splitterRight = child;
              }
            }

            //Inject splitter buttons
            if (!!$scope.splitterLeft) {
              $scope.splitHandleLeft = angular.element('<div class="bento-splitter-handle bento-splitter-handle-left"></div>');
              $element.append($scope.splitHandleLeft);
              // Initialize left width
              $scope.splitterLeft.css('width', $scope.leftWidth);
              $scope.splitterLeft.css('left', '-' + $scope.leftWidth);
              // Initialize splitHandleLeft listener
              $scope.splitHandleLeft.one('touchstart mousedown', $scope.onHandleDown);
              mainPaneInner.className += ' has-left-pane';

              // Assign Notifications
              splitterGroupNotification.addNotification(
                'openLeft',
                function () {
                  if (!$element.hasClass('opened-left')) {
                    $scope.actionOnLeft = true;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );

              splitterGroupNotification.addNotification(
                'closeLeft',
                function () {
                  if ($element.hasClass('opened-left')) {
                    $scope.actionOnLeft = true;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );

            }

            if (!!$scope.splitterRight) {
              $scope.splitHandleRight = angular.element(
                '<div class="bento-splitter-handle bento-splitter-handle-right"></div>');
              $element.append($scope.splitHandleRight);
              // Initialize right width
              $scope.splitterRight.css('width', $scope.rightWidth);
              $scope.splitterRight.css('right', '-' + $scope.rightWidth);
              // Initialize splitHandleRight listener
              $scope.splitHandleRight.one('touchstart mousedown', $scope.onHandleDown);
              mainPaneInner.className += ' has-right-pane';

              // Assign Notifications
              splitterGroupNotification.addNotification(
                'openRight',
                function () {
                  if (!$element.hasClass('opened-right')) {
                    $scope.actionOnLeft = false;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );

              splitterGroupNotification.addNotification(
                'closeRight',
                function () {
                  if ($element.hasClass('opened-right')) {
                    $scope.actionOnLeft = false;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );
            }

            // Check Collapse
            if (!!$scope.splitterLeft) {
              // Left
              $element.addClass('opened-left');
              $scope.splitterLeft.css('left', '0');
              $scope.splitterMain.css('left', $scope.leftWidth);
              $scope.splitHandleLeft.css('left', $scope.leftWidth);
            }

            if (!!$scope.splitterRight) {
              $element.addClass('opened-right');
              $scope.splitterRight.css('right', '0');
              $scope.splitterMain.css('right', $scope.rightWidth);
              $scope.splitHandleRight.css('right', $scope.rightWidth);
            }

            if (typeof $scope.isLeftCollapsed !== 'undefined' && !!$scope.splitterLeft) {
              $scope.$watch('isLeftCollapsed()', function (newValue, oldValue) {
                if ((newValue && $element.hasClass('opened-left')) ||
                  (!newValue && !$element.hasClass('opened-left'))) {

                  $scope.actionOnLeft = true;
                  $scope.onHandleClick(null);
                }
              });
            }

            if (typeof $scope.isRightCollapsed !== 'undefined' && !!$scope.splitterRight) {
              $scope.$watch('isRightCollapsed()', function (newValue, oldValue) {
                if ((newValue && $element.hasClass('opened-right')) ||
                  (!newValue && !$element.hasClass('opened-right'))) {

                  $scope.actionOnLeft = false;
                  $scope.onHandleClick(null);
                }
              });
            }

            // Auto-resize the parent container
            if (!!$scope.autoResize()) {
              // Get DOM Reference
              var parentContainer = $element[0].parentNode;
              var leftContainer = $element[0].querySelector('.bento-splitter-group-left');
              var mainContainer = $element[0].querySelector('.bento-splitter-group-main-inner');
              var rightContainer = $element[0].querySelector('.bento-splitter-group-right');
              // Preserve the parent original height when this
              // directive shrinks too small
              parentContainer.style.minHeight = parentContainer.offsetHeight + 'px';

              // Adding padding to left, main and right containers
              // and set overflow-y to hidden width one parent class
              $element.addClass('auto-resize');

              // Adding three marker objects to determine where the last line is
              var markerLeft;
              var markerRight;
              var markerMain;

              if (!!leftContainer) {
                markerLeft = document.createElement('div');
                markerLeft.classNames = 'clearfix';
                leftContainer.appendChild(markerLeft);
              }

              markerMain = document.createElement('div');
              markerMain.classNames = 'clearfix';
              mainContainer.appendChild(markerMain);

              if (!!rightContainer) {
                markerRight = document.createElement('div');
                markerRight.classNames = 'clearfix';
                rightContainer.appendChild(markerRight);
              }

              // Watch the three containers and return the most height
              // and adjust their parent container
              $scope.$watch(
                function () {
                  var newHeight = Math.max(
                    !!markerLeft ? markerLeft.offsetTop : 0,
                    !!markerRight ? markerRight.offsetTop : 0,
                    !!markerMain ? markerMain.offsetTop : 0
                  );
                  return newHeight;
                },
                function (newValue) {
                  parentContainer.style.height = (newValue + 24) + 'px';
                });
            }

            //Add the transition class to the left and main pane
            //0.5second after the page is rendered
            //because IE renders the animation on the main pane when
            //the left pane is opened
            $timeout(function () {

              if (!!$scope.splitterLeft) {
                $scope.splitterLeft.addClass('animate');
              }

              $scope.splitterMain.addClass('animate');

              if (!!$scope.splitterRight) {
                $scope.splitterRight.addClass('animate');
              }
            }, 500);
          }
        };
      }
    ])
    .directive('bentoSplitterGroupLeft', function () {
      return {
        require : '^bentoSplitterGroup',
        restrict: 'A',
        scope   : false,
        link    : function ($scope, $element) {
          $element.addClass('bento-splitter-group-left');
        }
      };
    })
    .directive('bentoSplitterGroupRight', function () {
      return {
        require : '^bentoSplitterGroup',
        restrict: 'A',
        scope   : false,
        link    : function ($scope, $element) {
          $element.addClass('bento-splitter-group-right');
        }
      };
    })
    .directive('bentoSplitterGroupMain', function () {
      return {
        require   : '^bentoSplitterGroup',
        restrict  : 'A',
        replace   : true,
        transclude: true,
        template  : '<section class="bento-splitter-group-main">' +
        '  <div class="bento-splitter-group-main-inner" data-ng-transclude></div>' +
        '</section>',
        scope     : false,
        link      : function ($scope, $element) {
        }
      };
    });

})(window, window.angular);