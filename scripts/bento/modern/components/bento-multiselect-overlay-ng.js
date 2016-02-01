/**
 * Bento Multiselect Overlay
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 15/04/2015
 *
 * Changelog:
 *
 * 15/04/2015
 * - Width is now adjusted so that the inner tab pills are not getting cut off
 * - Word-wrap is removed and now using ellipsis instead
 * - Overlay now has more appropriate functionality to position its container
 *
 * 08/04/2015
 * - Labels are all exposed
 * - More features
 * - Updated inline code documentation
 *
 * 06/03/2015
 * - Initial build
 *
 */
(function (angular, window) {
  'use strict';
  angular.module('bento.multiselectoverlay', ['bento.services'])
    .directive('bentoMultiselectOverlay', [
      function () {
        return {
          require    : 'ngModel',
          scope      : {
            ngModel            : '=', // in Array
            selectedItems      : '=?', // in Array
            ngChange           : '&', // Callback function
            side               : '@', // Side where the overlay shows ['left : 'right']
            doneButtonText     : '@', // Text for Done button
            selectAllText      : '@', // Text for Select All checkbox
            showAllText        : '@', // Text for Show All tab
            showSelectedText   : '@', // Text for Show Selected tab
            selectButtonText   : '@', // Text for select
            editButtonText     : '@', // Text for Edit
            selectedInfoText   : '@', // Text for Info text next to the Edit button
            allSelectedInfoText: '@'  // Text Pattern for Info text when all items are selected

          },
          templateUrl: '../templates/multiselect_overlay/bento-multiselect-overlay.html',
          link       : function (scope, element, attrs) {
            var $sideOverlay = angular.element(element[0].querySelector('.bento-side-overlay'));

            // Internal data model
            scope.data = {
              buttonText        : (!!scope.selectButtonText) ? scope.selectButtonText : 'Select',
              selectItemFeedback: ''
            };

            // Init selectedItems when not defined or assigned
            if (typeof scope.selectedItems === 'undefined') {
              scope.selectedItems = [];
            }

            // Watch selectedItems on change to update the rednering and child directives
            scope.$watch('selectedItems.length', function (newValue) {
              // Render text only when the sideOverlay is not expanded
              if (!$sideOverlay.hasClass('open')) {
                renderText();
              }
            });

            // Need to know when the Side Overlay is hidden
            scope.onDoneClick = function () {
              // Reder text
              renderText();
            };

            /* private helpers */
            // Render text copy and button labels
            function renderText() {
              scope.data.buttonText = scope.selectedItems.length === 0 ?
                (!!scope.selectButtonText) ? scope.selectButtonText : 'Select' : (!!scope.editButtonText) ? scope.editButtonText : 'Edit';

              // Update text
              if (scope.selectedItems.length === 0) {
                scope.data.selectItemFeedback = '';
                return;
              } else if (scope.selectedItems.length === 1) {
                scope.data.selectItemFeedback = scope.selectedItems[0].name;
              } else if (scope.selectedItems.length === scope.ngModel.length) {
                scope.data.selectItemFeedback = (!!scope.allSelectedInfoText) ?
                  scope.allSelectedInfoText.replace('NUMBER', scope.ngModel.length) :
                'All (' + scope.ngModel.length + ') selected';
              } else {
                scope.data.selectItemFeedback = (!!scope.selectedInfoText) ?
                  scope.selectedInfoText.replace('NUMBER', scope.selectedItems.length) :
                scope.selectedItems.length + ' selected';
              }
              // Add a couple space after
              scope.data.selectItemFeedback += '&nbsp;&nbsp;&nbsp;';
            }
          }
        };
      }])

  /**
   * Sub Directive
   * Bento Side Overlay and elements
   */
    .directive('bentoSideOverlay', [
      '$timeout',
      function ($timeout) {
        return {
          scope   : false,
          restrict: 'A',
          link    : function (scope, element, attrs, controller) {
            // properties and pointer to do the geo calculations
            var overlayMargin = 20;
            var side = attrs.side ? attrs.side.trim() : 'right';
            var $toggleButton = angular.element(element[0].querySelector('.bento-side-overlay-toggle'));
            var $overlayContainer = angular.element(element[0].querySelector('.bento-side-overlay-container'));
            var $overlayFooter = angular.element(element[0].querySelector('.bento-side-overlay-container-footer'));
            var overlayInnerFill = $overlayContainer[0].querySelector('.fill');
            var overlayHeight = 0;
            var $doneButton = angular.element(element[0].querySelector('.bento-side-overlay-container-footer-done'));
            var scrollableParent = getScrollableParent(element[0].parentElement);

            // Watch exposed label text for realtime update
            scope.$watch(function () {
              return attrs.doneButtonText;
            }, function (newValue) {
              newValue = String(newValue);
              $doneButton.text((newValue.trim().length === 0 || newValue === 'undefined') ? 'Done' : newValue);
            });

            // Init directive CSS classes
            element.addClass('bento-side-overlay');
            element.addClass((side === 'right') ? 'bento-side-overlay-right' : 'bento-side-overlay-left');

            // Toggle button listener
            $toggleButton.on('click touch', function ($event) {
              if (!element.hasClass('open')) {
                element.addClass('open');
                renderOverlay();
                $timeout(function () {
                  // `click` should not be used since the items clicked in the overlay could disappear before
                  // the window recieves its event
                  window.addEventListener('mousedown', onWindowClick);
                  window.addEventListener('touchstart', onWindowClick);
                });

                // disable the parent scroll from double scrolling
                scrollableParent.style.overflowY = 'hidden';
              } else {
                onDoneClick($event);
              }
            });

            // Done button listener and function
            $doneButton.on('click touch', onDoneClick);

            // jQuery event Listener
            function onDoneClick($event) {
              element.removeClass('open');
              window.removeEventListener('click', onWindowClick);
              scrollableParent.style.overflowY = 'auto';

              if (!!attrs.onDone) {
                var funcName = attrs.onDone.replace('()', '').trim();

                // fire callback function
                if (!!scope[funcName]) {
                  scope[funcName]();
                  // notify NG digest
                  scope.$apply();
                }
              }
            }

            // Window (aka Done) click listener function
            function onWindowClick($event) {
              if (!element[0].contains($event.target)) {
                onDoneClick($event);
              }
            }

            // Watch and assign overlay height
            if (!!attrs.overlayHeight) {
              scope.$watch(function () {
                return scope[attrs.overlayHeight.trim()];
              }, function (newHeight) {
                overlayHeight = newHeight;
              });
            }

            // Watch and adjust footer height when switching `force-desktop` class
            scope.$watch(function () {
              return $overlayFooter[0].offsetHeight;
            }, function (newHeight) {
              $overlayContainer.css('padding-bottom', newHeight + 'px');
            });

            // Get the parent where there is scrolling or <body>
            function getScrollableParent(el) {
              var overflowY = getComputedStyle(el).getPropertyValue('overflow-y');
              var overflow = getComputedStyle(el).getPropertyValue('overflow');

              if (overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll') {
                return el;
              } else if (el.nodeName === 'BODY') {
                return el;
              } else {
                return getScrollableParent(el.parentElement);
              }
            }

            // Find out how far the toggle is away from it's scrolling parent
            function getElementOffsetFrom(element, parentElement) {
              var parentRect = parentElement.getBoundingClientRect();
              var toggleRect = element.getBoundingClientRect();

              // Return the relative RECT of the toggle button to the given parent
              return {
                left: toggleRect.left - parentRect.left,
                right: parentRect.right - toggleRect.right,
                top: toggleRect.top - parentRect.top,
                bottom: parentRect.bottom - toggleRect.bottom,
                width: toggleRect.width,
                height: toggleRect.height
              };
            }

            // Render and position overlay
            function renderOverlay() {
              var maxOverlayHeight = scrollableParent.offsetHeight - overlayMargin * 2;
              var overlayInnerHeight = !!attrs.overlayHeight ? scope[attrs.overlayHeight] : -1;
              var toggleOffset = getElementOffsetFrom($toggleButton[0],scrollableParent);
              var toggleOffsetTop = toggleOffset.top -
                ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
              var toggleCenterOffsetTop = toggleOffsetTop + $toggleButton[0].offsetHeight * 0.5;

              // Set default height
              $overlayContainer.css('height', (overlayInnerHeight + $overlayFooter[0].offsetHeight) + 'px');

              // check toggle button location and realign if needed
              // for better layout spacing
              var allowedTopSpacing = overlayMargin + 25;
              var overlayHeight = $overlayContainer[0].offsetHeight;
              var targetOverlayTop;

              // adjust overlay height based on the scrollable container or body
              if (overlayInnerHeight > 0) {
                // overlayHeight is bigger than max-height
                if (overlayInnerHeight > maxOverlayHeight - $overlayFooter[0].offsetHeight) {
                  $overlayContainer.css('max-height', maxOverlayHeight + 'px');
                } else {
                  $overlayContainer.css('max-height', (overlayInnerHeight + $overlayFooter[0].offsetHeight) + 'px');
                }
              } else {
                $overlayContainer.css('max-height', maxOverlayHeight + 'px');
              }

              //when the scrollable is <BODY>
              if(scrollableParent.tagName === 'BODY') {

                // We need to scroll up a little bit
                if (toggleCenterOffsetTop < allowedTopSpacing) {
                  // IE
                  if(document.documentElement){
                    document.documentElement.scrollTop = toggleOffset.top - allowedTopSpacing;
                  }
                  // Other browsers
                  else {
                    scrollableParent.scrollTop = toggleOffset.top - allowedTopSpacing;
                  }
                  toggleCenterOffsetTop = allowedTopSpacing + $toggleButton[0].offsetHeight * 0.5;
                } else
                // We need to scroll down a little
                if (toggleCenterOffsetTop > scrollableParent.offsetHeight - allowedTopSpacing) {
                  // IE
                  if(document.documentElement) {
                    document.documentElement.scrollTop = (toggleOffset.top + $toggleButton[0].offsetHeight) -
                    scrollableParent.offsetHeight +
                    allowedTopSpacing;
                  }
                  // Other Broswers
                  else{
                    scrollableParent.scrollTop = (toggleOffset.top + $toggleButton[0].offsetHeight) -
                    scrollableParent.offsetHeight +
                    allowedTopSpacing;
                  }
                  toggleCenterOffsetTop = scrollableParent.offsetHeight - allowedTopSpacing -
                  $toggleButton[0].offsetHeight * 0.5;
                }

                // Set default
                targetOverlayTop = -overlayHeight * 0.5

                // Make sure the overlay is not overflowing the top
                if (-targetOverlayTop > toggleCenterOffsetTop - overlayMargin) {
                  targetOverlayTop = -(toggleCenterOffsetTop - overlayMargin + $toggleButton[0].offsetHeight * 0.25);
                } else
                // Make sure the overlay is not overflowing the bottom
                if (-targetOverlayTop > scrollableParent.offsetHeight - toggleCenterOffsetTop - overlayMargin) {
                  targetOverlayTop = scrollableParent.offsetHeight - toggleCenterOffsetTop - overlayMargin - overlayHeight - $toggleButton[0].offsetHeight * 0.25;
                }
              }
              // Scrollable is other
              else{
                // We need to scroll up a little bit
                if(toggleOffset.bottom < allowedTopSpacing){
                  scrollableParent.scrollTop += allowedTopSpacing - toggleOffset.bottom;
                }
                // We need to scroll down a little
                else if(toggleOffset.top < allowedTopSpacing){
                  scrollableParent.scrollTop -= allowedTopSpacing - toggleOffset.top;
                }

                var overlayLocalRect = getElementOffsetFrom($overlayContainer[0], scrollableParent);

                // set default
                targetOverlayTop = $overlayContainer[0].offsetTop;

                // Make sure the overlay is not overflowing the top
                if (overlayLocalRect.top < overlayMargin) {
                  targetOverlayTop = $overlayContainer[0].offsetTop - overlayLocalRect.top + overlayMargin;
                } else
                // Make sure the overlay is not overflowing the bottom
                if (overlayLocalRect.bottom < overlayMargin) {
                  targetOverlayTop = $overlayContainer[0].offsetTop + overlayLocalRect.bottom - overlayMargin;
                }
              }

              $overlayContainer.css('top', targetOverlayTop + 'px');
            }
          }
        };
      }
    ])
    // THe actual toggle button
    .directive('bentoSideOverlayToggle', [
      function () {
        return {
          restrict: 'A',
          scope   : false,
          link    : function (scope, element, attrs) {
            // only add class
            element.addClass('bento-side-overlay-toggle noselect');
          }
        };

      }
    ])
    // Redering to the actual toggle
    // Might need templateUrl later
    .directive('bentoSideOverlayContent', [
      function () {
        return {
          restrict: 'A',
          scope   : false,
          link    : function (scope, element, attrs) {
            element.addClass('bento-side-overlay-container');
            element.wrap('<div class="bento-side-overlay-container-wrapper"></div>');

            // Add arrows
            var leftArrow = '<div class="bento-side-overlay-left-arrow">' +
              '<svg height="35" width="20">' +
              '<polygon points="21,0 0.5,17.5 21,35" class="bento-side-overlay-triangle" />' +
              '</svg>' +
              '</div>';
            var rightArrow = '<div class="bento-side-overlay-right-arrow">' +
              '<svg height="35" width="20">' +
              '<polygon points="-1,0 19.5,17.5 -1,35" class="bento-side-overlay-triangle" />' +
              '</svg>' +
              '</div>';
            element.after(leftArrow);
            element.after(rightArrow);

            // Add footer
            var footer = '<div class="bento-side-overlay-container-footer">' +
              '<button class="btn btn-primary bento-side-overlay-container-footer-done"></button>' +
              '</div>';
            element.append(footer);

          }
        };
      }
    ])

  /**
   * Sub Directive
   * Bento MultiSelect List
   */

    /*
     * Show only the selected item base on the flag
     */
    .filter('multiselectShowSelected', function () {
      return function (itemArray, flag) {
        if (flag) {
          var arr = [];
          for (var i = 0; i < itemArray.length; i++) {
            var item = itemArray[i];
            if (item.__bsoChecked) {
              arr.push(item);
            }
          }
          return arr;
        }

        return itemArray;
      };
    })
    .directive('bentoMultiselectList', [
      '$timeout',
      '$bentoServices',
      function ($timeout, $bentoServices) {
        return {
          require    : 'ngModel',
          templateUrl: '../templates/multiselect_list/bento-multiselect-list.html',
          scope      : {
            ngModel         : '=',
            ngChange        : '&',
            selectedItems   : '=?',
            side            : '@',
            selectAllText   : '@',
            showAllText     : '@',
            showSelectedText: '@',
            maxAllowedHeight: '=?' // Get the total height of the scrolling for external use
          },
          link       : function (scope, element, attrs) {
            var firstLoad = true;

            if (typeof scope.selectedItems === 'undefined') {
              scope.selectedItems = [];
            }
            scope.searchTerm = {name: ''};
            scope.$watchCollection('selectedItems', function (newArray, oldArray) {

              for (var i = 0; i < oldArray.length; i++) {
                oldArray[i].__bsoChecked = false;
              }

              for (var i = 0; i < newArray.length; i++) {
                newArray[i].__bsoChecked = true;
              }

              // Check whether to show the check to "Select All" checkbox
              if (newArray.length === scope.ngModel.length) {
                scope.selectAll = true;
              } else {
                scope.selectAll = false;
              }

              // Fire a callback
              if (!firstLoad) {
                scope.ngChange();
              } else {
                firstLoad = false;
              }
            });

            var searchBar = element[0].querySelector('.bento-multiselect-search');
            var scrollPane = element[0].querySelector('.bento-multiselect-list-scroll-pane');

            element.addClass('bento-multiselect-list-wrapper');

            //Watch the top offset of `.bento-multiselect-list-scroll-pane`
            scope.$watch(function () {
              return searchBar.offsetHeight;
            }, function (newHeight) {
              scrollPane.style.top = newHeight + 'px';

              // Update maxAllowedHeight
              scope.maxAllowedHeight = searchBar.offsetHeight + scrollPane.scrollHeight;
            });

            /**
             * Triggers select and deselect all items
             */
            scope.onSelectAllClick = function () {
              scope.selectAll = !scope.selectAll;

              if (scope.selectAll) {
                scope.selectedItems = [];
                for (var i = 0; i < scope.ngModel.length; i++) {
                  var item = scope.ngModel[i];
                  scope.selectedItems.push(item);
                }
              } else {
                scope.selectedItems = [];
              }
            };

            /**
             * Update checked status when an item is clicked
             * @param item
             */
            scope.onItemClick = function (item) {
              var selectItemIndex = scope.selectedItems.indexOf(item);

              if (selectItemIndex === -1) {
                scope.selectedItems.push(item);
              } else {
                scope.selectedItems.splice(selectItemIndex, 1);
              }
            };

            /**
             * Like htmlentities in PHP, it change special characters such as (>) into their encoded values (&lt;)
             */
            scope.htmlEntities = function (str) {
              return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            };

            // Get Max height
            $timeout(function () {
              scope.maxAllowedHeight = searchBar.offsetHeight + scrollPane.scrollHeight;
            });
          }
        };
      }]);
})
(window.angular, window);