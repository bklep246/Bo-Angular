/**
 * Bento Combobox NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>, Dave Collier <dave.collier@thomsonreuters.com>
 * @version 0.6.3
 * @date 15/04/2015
 *
 *
 * Changelog:
 *
 * 16/04/2015
 * - adding changes to make it work with 'bento-append-to-body' directive
 * - grabbing all element's object pointer into scope.bentoContainerProperties once DOM is rendered
 * - $emit an event 'append_to_parent_show_list' when user clicks on the dropdown arrow. 
 * To be very specific, when 'isContainerVisible' is set to true 
 *
 *
 * 15/04/2015
 * - baseData now is updated and rednered without users first interaction
 * - TAB and keyboard events are supported in non-search mode
 *
 * 13/02/2015
 * - [FIXED] bento-combobox closes dropdown the first time you press enter on focus CXUI-573
 *
 * 09/02/2015
 * - `onChange()` not fired when selecting two different server items with the same `selectedIndex` is fixed CXUI-575
 *
 * 22/01/2015
 * - Various fixes on TAB and ARROW key commands
 * - FocusOut event when clicking on other comboboxes is fixed
 * - InputField focus and selection command is fixed without AngularJS $apply() error
 * - Code simplification on selections and `disabled="false"` rendering
 *
 * 16/01/2015
 * - Added `ignoreInputClick=[boolean]`
 *
 * 15/01/2015
 * - Various fixes based on empty dataset with tableDropdown view
 * - Empty `inputLabel` when focusOut and `selectedIndex == -1`
 * - Added new property `minSearchCharacterCount` to set the min character count to trigger server search (default = 3)
 *
 * 07/01/2015
 * - Empty text field + `Enter Key` puts index back to `-1` and fires an `onChange()` event
 *
 * 30/12/2014
 * - Change `userServer` binding type
 *
 * 16/10/2014
 * New Features:
 * - 'Home', 'End', 'Page Up' and 'Page Down' user interactions are added
 * - UX to `Tab` keypress is refined
 *
 * 14/10/2014
 * Fixes:
 * - Firefox cannot select using mouse
 *
 * 09/10/2014
 * New Features:
 * - 'up', 'down', 'left' and 'right' keys now loops selection
 *
 * Fixes:
 * - Table header alignments are fixed when resizing window
 * - Placeholder resets when nothing is selected on `focusout`
 *
 * 07/10/2014
 * New Features:
 * - `reset-list-on-select=[true|false]` is added to determine whether to reset the list on selection
 * Fix:
 * - Adding server request reset on `selected-index=-1`
 *
 * 06/10/2014
 * Fix:
 * - `selected-index="-1"` does not reflect to reset its properties
 *
 * 10/09/2014
 * New Features:
 * - added `selectedIndex="-1"` to reset the combobox
 * - added tab selection
 *
 * 23/07/2014
 * New Features:
 * - Dropdown now supports simple grid
 * - Header is added
 * - Footer is added
 * Fix:
 * - Search not working from v0.2
 *
 *
 * 11/07/2014
 * New Feature:
 * `onChange` callback function is added with two parameters `value` and `label`
 * Fix:
 * `tabindex="-1"` is added to dropdown items for `event.relatedTarget` to have the right DOM pointer in `focusout`
 *
 * 22/04/2014
 * Initial build
 *
 * Features:
 *
 * - 10 seconds server timeout
 * - `selectedIndex` attribute when user updates the selection dynamically
 * - Server loading
 *
 *
 *
 */


(function (angular) {

  "use strict";

  var comboboxApp = angular.module('bento.combobox', ['ngSanitize', 'bento.services']);

  comboboxApp
  /**
   * CONSTANTS
   */
    .constant('COMBOBOX_SERVER_TIMEOUT', 10000) // Set 10 seconds of server timeout
    .constant('COMBOBOX_PAGE_UP', -1)  // Page up direction
    .constant('COMBOBOX_PAGE_DOWN', 1) // page down direction
  /**
   * bentoComboboxControl
   */
    .controller('bentoComboboxControl', [
      '$scope',
      '$element',
      '$timeout',
      '$attrs',
      '$bentoServices',
      '$log',
      'COMBOBOX_SERVER_TIMEOUT',
      'COMBOBOX_PAGE_UP',
      'COMBOBOX_PAGE_DOWN',
      function ($scope, $element, $timeout, $attrs, $bentoServices, $log, $document, COMBOBOX_SERVER_TIMEOUT, COMBOBOX_PAGE_UP, COMBOBOX_PAGE_DOWN) {
        // Local variable
        var digestTimeoutID = 0;
        var dataHasLoaded = false;
        var searched = false;
        var isFocused = false;
        var firstTimeLoad = true;
        var digestTimeoutDuration = 500;
        var digestWaitingCount = 0;
        var addedEventListeners = {};
        var currentObject;
        var previousKeyCode;
        var previousShiftKey;

        // Determine if this is a table dropdown by it's headers
        $scope.isTableDropdown = !!$scope.headers() && $scope.headers().length > 0;
        // initialize if the dropdown is visible or not
        $scope.isContainerVisible = false;
        $scope.inputLabel = '';
        $scope.currentSelectedIndex = -1;
        $scope.usingArrowKey = false;
        $scope.data = [];

        $scope.bentoContainerProperties = {
          containerHeader: null, 
          containerBody: null, 
          containerItem: null
        }

        $element.addClass('form-control');

        // Pass down classes from the parent to input fields
        if ($element[0].className.trim().length > 0) {
          $scope.inputClasses = $element[0].className;
        }

        $scope.arrowDirection = 'down';

        if ($element.hasClass('up')) {
          $scope.arrowDirection = 'up';
        }

        if (!!$scope.placeholder) {
          $scope.inputLabelPreview = $scope.placeholder;

          $scope.$watch('placeholder', function (newValue) {
            $scope.inputLabelPreview = $scope.placeholder;
          });
        }

        this.getIsTableDropdown = function() {
          return $scope.isTableDropdown;
        }

        this.getIsContainerVisible = function() {
          return $scope.isContainerVisible;
        }

        this.getBentoContainerProperties = function() {
          return $scope.bentoContainerProperties;
        }

        // Setting input focus to handle visual feedback to the parent element
        $scope.onInputFocus = function () {
          $element.addClass('in-focus');

          // Reset key-press status
          previousKeyCode = 0;
          previousShiftKey = false;
        };

        $scope.onInputBlur = function () {
          $element.removeClass('in-focus');
        };

        // Watch if the user updates the baseData
        $scope.$watchCollection('baseData', function () {

          // There is no data in the dataset
          // Remove everything from the list
          if (!$scope.baseData || $scope.baseData.length === 0) {
            $scope.data = $scope.baseData;
            return;
          }
          // Update data
          $scope.data = $scope.baseData;

          // Server is loaded after the index is set
          if (firstTimeLoad && !!$attrs.selectedIndex && $scope.selectedIndex > -1) {
            var itemObject = $scope.data[$scope.selectedIndex];
            if (typeof itemObject[$scope.labelName] === 'string') {
              $scope.inputLabel = itemObject[$scope.labelName];
            } else {
              $scope.inputLabel = itemObject[0];
            }
          }

          firstTimeLoad = false;

          // Reset variables and timeouts
          dataHasLoaded = true;
          digestWaitingCount = 0;
          clearTimeout(digestTimeoutID);
          $element.removeClass('loading');

          // Align headers
          if ($scope.isTableDropdown) {
            $scope.alignHeaders();
          }

        });

        if (!!$attrs.selectedIndex) {
          // Watch selectedIndex for index updates from the parent controller
          $scope.$watch('selectedIndex', function (newValue) {
            if ($scope.selectItem(newValue)) {
              $scope.currentSelectedIndex = newValue;
            } else {
              //reset the combobox if the newIndex does not present
              $scope.inputValue = '';
              $scope.inputLabel = '';
              $scope.inputLabelPreview = (!!$scope.placeholder) ? $scope.placeholder : '';
              $scope.currentSelectedIndex = -1;

              // Reset server related queries
              if ($scope.useServer) {
                if ($scope.inputLabel.trim().length === 0 && searched) {
                  searched = false;
                  if (!!$scope.onPageRequest) {
                    $scope.currentLoadedPageIndex = 0;
                    $scope.onPageRequest({
                      page        : $scope.currentLoadedPageIndex,
                      searchString: ''
                    });
                  }
                }
              }
            }
          });
        }

        // Watch isContainerVisible on Table base dropdowns for header alignment
        if ($scope.isTableDropdown) {
          $scope.$watch('isContainerVisible', function (newValue) {
            // Align headers
            if (newValue) {
              $scope.alignHeaders();
            }
       
          });

          // Watch list width on window resizing
          var headersForResizing;
          var columnsForResizing;
          if (typeof addedEventListeners.resize === 'undefined') {
            window.addEventListener('resize', function (event) {
              var columnContainer = $scope.bentoContainerProperties.containerItem;//$element[0].querySelector('.bento-combobox-container-item');

              //There is nothing to resize when the table doesn't have any content
              if (typeof columnContainer === 'undefined' || columnContainer === null) {
                return;
              }

              if (typeof headersForResizing === 'undefined') {
                headersForResizing = $scope.bentoContainerProperties.containerHeader.children;//$element[0].querySelector('.bento-combobox-container-header').children;
                columnsForResizing = columnContainer.children;
              }

              for (var i = 0; i < headersForResizing.length; i++) {
                if (i < headersForResizing.length - 1) {
                  headersForResizing[i].style.width = (i + 1 === headersForResizing.length) ?
                  (columnsForResizing[i].offsetWidth - 20) + 'px' : // last header to avoid wrapping from padding
                  columnsForResizing[i].offsetWidth + 'px';
                }
              }
            });

            addedEventListeners.resize = true;
          }
        }

        // Setup listeners for server enabled
        if ($scope.useServer) {
          if(!$scope.bentoContainerProperties.containerBody) {
            $scope.bentoContainerProperties.containerBody = $element[0].querySelector('.bento-combobox-container-body');
          }
          $scope.containerBody = $scope.bentoContainerProperties.containerBody;//$element[0].querySelector('.bento-combobox-container-body');
          $scope.containerList = $scope.containerBody.firstElementChild;
          $scope.currentLoadedPageIndex = 0;
          if (typeof addedEventListeners.scroll === 'undefined') {
            $scope.containerBody.addEventListener('scroll', function (event) {
              if (
                $scope.containerList.offsetHeight - $scope.containerBody.offsetHeight - $scope.containerBody.scrollTop < 1000 &&
                dataHasLoaded) {
                dataHasLoaded = false;

                // Fire load next page with two parameters
                // page - the new page index to load
                // searchString - if loading the next page for searching
                if (!!$scope.onPageRequest) {
                  $scope.currentLoadedPageIndex++;
                  $scope.onPageRequest({
                    page        : $scope.currentLoadedPageIndex,
                    searchString: ($scope.usingArrowKey && !searched) ? '' : $scope.inputLabel.trim()
                  });
                }

                // Digest for $watch;
                $scope.timeoutDigest();
              }
            });
            addedEventListeners.scroll = true;
          }

        }

        /**
         * Handles when an item is clicked in the combobox
         * @param index
         */
        $scope.onItemClick = function (index) {
          // Better Logic
          var newObject = $scope.data[index];
          var newIndex = $scope.baseData.indexOf(newObject);

          // Check if the select object is the same
          if(angular.equals(currentObject, newObject) && $scope.selectedIndex ===  newIndex){
            $scope.isContainerVisible = false;
            return;
          }

          currentObject = newObject;

          if (!!$attrs.selectedIndex) {
            //$watch doesn't trigger... even it's a different object
            if(newIndex === $scope.selectedIndex){
              $scope.currentSelectedIndex = newIndex;
              $scope.selectItem(newIndex);
            }else{
              //Set selectedIndex to a new one to trigger $watch
              $scope.selectedIndex = newIndex;
            }

          } else {
            $scope.currentSelectedIndex = index;
            $scope.selectItem(index);
          }

          $scope.isContainerVisible = false;
        };

        /**
         * Handles all keydowns in the input field.
         * @param $event
         */
        $scope.onInputKeydown = function ($event) {

          // Key down & key left
          if ($event.keyCode === 40
          //|| $event.keyCode === 39
          ) {

            if ($scope.data.length > 0) {
              $scope.currentSelectedIndex = ($scope.currentSelectedIndex + 1) % $scope.data.length;
              $scope.selectItem($scope.currentSelectedIndex, true);
            }

            $scope.isContainerVisible = true;
            $scope.usingArrowKey = true;

            $event.preventDefault();
            $event.stopPropagation();
          } else
          // Key up & key right
          if ($event.keyCode === 38
          //|| $event.keyCode === 37
          ) {
            if ($scope.data.length > 0) {
              if ($scope.currentSelectedIndex === -1) {
                $scope.currentSelectedIndex = $scope.data.length - 1;
              } else {
                $scope.currentSelectedIndex = ($scope.currentSelectedIndex + $scope.data.length - 1) % $scope.data.length;
              }
              $scope.selectItem($scope.currentSelectedIndex, true);
            }

            $scope.isContainerVisible = true;
            $scope.usingArrowKey = true;

            $event.preventDefault();
            $event.stopPropagation();
          } else
          // Enter Key
          if ($event.keyCode === 13) {
            // Toogle dropdown list
            $scope.isContainerVisible = !$scope.isContainerVisible;
            $scope.usingArrowKey = true;

            // Reset index back to -1 if the input field is empty
            if ($scope.inputLabel.trim().length === 0 && $scope.currentSelectedIndex === -1) {

              if (!!$attrs.selectedIndex) {
                $scope.selectedIndex = -1;
              }

              // Fire select event if $scope.isContainerVisible is false
              if (!$scope.isContainerVisible && !!$scope.onChange) {
                $scope.onChange({
                  index: -1
                });
              }
            }

            $event.preventDefault();
            $event.stopPropagation();
          } else
          // Tab Key
          if ($event.keyCode === 9) {
            if ($scope.currentSelectedIndex > -1) {
              if (!!$attrs.selectedIndex) {
                $scope.selectedIndex = $scope.baseData.indexOf($scope.data[$scope.currentSelectedIndex]);
              } else {
                $scope.selectItem($scope.currentSelectedIndex, false);
              }
            } else {
              checkValueOnFocusOut();
            }
            $scope.usingArrowKey = true;
            $scope.isContainerVisible = false;

          } else
          // Escape key
          if ($event.keyCode === 27) {
            $scope.isContainerVisible = false;
          } else
          // `Home`, `End`, `Page Up` and `Page Down` Keys
          if ($event.keyCode > 32 && $event.keyCode < 37) {
            var inputField = $element.children()[0];
            switch ($event.keyCode) {
              // Page Up
              case 33:
                // We are in the beginning already
                if ($scope.currentSelectedIndex <= 0) {
                  // Just need to select the first one when this combobox has just been loaded
                  $scope.currentSelectedIndex = 0;
                  $scope.selectItem($scope.currentSelectedIndex, true);
                  break;
                }
                changePage(COMBOBOX_PAGE_UP);
                break;
              // Page Down
              case 34:
                // We are at the end already
                if ($scope.currentSelectedIndex === $scope.data.length - 1) {
                  break;
                }
                changePage(COMBOBOX_PAGE_DOWN);
                break;
              // End
              case 35:
                // skip when shift key is pressed
                if ($event.shiftKey) {
                  break;
                }
                $scope.currentSelectedIndex = $scope.data.length - 1;
                $scope.selectItem($scope.currentSelectedIndex, true);
                // change selection to end
                inputField.setSelectionRange($scope.inputLabel.length, $scope.inputLabel.length);
                break;
              // Home
              case 36:
                // skip when shift key is pressed
                if ($event.shiftKey) {
                  break;
                }
                $scope.currentSelectedIndex = 0;
                $scope.selectItem($scope.currentSelectedIndex, true);
                // change selection to home
                inputField.setSelectionRange(0, 0);
                break;
            }

            // show dropdown
            $scope.isContainerVisible = true;
            $scope.usingArrowKey = true;

            // Prevent browsers from scrolling
            // only when shitkey is not pressed
            if (!$event.shiftKey) {
              $event.preventDefault();
              $event.stopPropagation();
            }
          }
        };

        /**
         * Handles any keyup.  Send and process functions based on which key is up
         * @param $event
         */
        $scope.onInputKeyup = function ($event) {

          // For server reset when user clears out the field
          // All pages need to be reset for the scroll
          // TODO: caching needs to be implemented to save costs
          if ($scope.inputLabel.trim().length === 0 && searched) {

            searched = false;
            if (!!$scope.onPageRequest) {
              $scope.currentLoadedPageIndex = 0;
              $scope.onPageRequest({
                page        : $scope.currentLoadedPageIndex,
                searchString: ''
              });
            }
          }

          // Enter key is pressed
          if ($event.keyCode === 13) {
            if ($scope.currentSelectedIndex > -1 &&
              ((previousKeyCode > 32 && previousKeyCode < 37) ||
                previousKeyCode === 38 ||
                previousKeyCode === 40
              ) &&
                !previousShiftKey
            ) {
              $scope.onItemClick($scope.currentSelectedIndex);
            }
            //$scope.data = $scope.baseData;
          }
          // Everything else that are printable including backspace and delete keys
          else if ( $scope.searchable &&
            ($bentoServices.isPrintableKeyCode($event.keyCode) ||
            $event.keyCode === 8 ||
            $event.keyCode === 46)
          ) {
            $scope.usingArrowKey = false;

            // Show dropdown when all keys are pressed
            $scope.isContainerVisible = true;

            // Start searching
            $scope.currentSelectedIndex = -1;
            $scope.searchAndAddData($scope.inputLabel);

            $scope.alignHeaders();
          }

          if (($event.keyCode === 8 || $event.keyCode === 46) && $scope.inputLabel.trim().length === 0) {
            if (!!$attrs.selectedIndex) {
              $scope.selectedIndex = -1;
            } else {
              $scope.currentSelectedIndex = -1;
            }
          }

          if ($scope.isContainerVisible) {
            addWindowFocusOutListener();
          }

          // Keep track on what is been pressed for next key-press
          previousKeyCode = $event.keyCode;
          previousShiftKey = $event.shiftKey;

          $event.preventDefault();
          $event.stopPropagation();

        };

        /**
         * When the combobox dropdown button is clicked
         */
        $scope.onDownArrowClick = function (selectAll, $event) {

          if ($scope.disabled) {
            return;
          }

          // Do not show
          if ($event.currentTarget.tagName === 'INPUT' && $scope.ignoreInputClick) {
            // Do nothing..
          }
          // Normal Combobox click
          else {
            $scope.isContainerVisible = !$scope.isContainerVisible;

            $scope.$emit("append_to_parent_show_list", $scope.isContainerVisible);

            if ($scope.isContainerVisible) {
              addWindowFocusOutListener();
            }
          }

          var input = $element.children()[0];

          $timeout(function () {
            // focus on the input field and select all text in the input field
            // This needs to be done when everything is rendered
            // Otherwise an $apply() conflict error will surface
            if ($scope.searchable && $scope.isContainerVisible) {
              if (selectAll) {
                // Select All
                input.setSelectionRange(0, input.value.length);
              } else {
                // Just set focus
                input.focus();
              }

            }

            if($scope.isContainerVisible){
              $scope.findAndShowSelectedItem();
            }
          });
        };

        /**
         * Select the actual item and assign both Label and Value to the directive
         * @param index
         * @param asPreview
         */
        $scope.selectItem = function (index, asPreview) {

          if (typeof $scope.data === 'undefined' ||
            index < 0 ||
            typeof index === 'undefined' ||
            index === null) {

            return false;
          }

          var labelObject = $scope.baseData[index][$scope.labelName];

          if (asPreview) {
            $scope.inputLabelPreview = (typeof labelObject !== 'string') ? labelObject[0] : labelObject;
          } else {
            $scope.inputLabel = (typeof labelObject !== 'string') ? labelObject[0] : labelObject;
            $scope.inputValue = $scope.baseData[index][$scope.valueName];

            // Fire onChange event callback function
            if (!!$scope.onChange) {
              $scope.onChange({
                value: $scope.inputValue,
                label: $scope.inputLabel,
                item : $scope.baseData[index],
                index: index
              });
            }

            // Check if need to reset the list
            if ($scope.resetListOnSelect()) {
              // Reset the current status of the input field
              searched = false;
              // Reset server search request back to page 1
              if ($scope.useServer) {
                $scope.currentLoadedPageIndex = 0;
                $scope.onPageRequest({
                  page        : $scope.currentLoadedPageIndex,
                  searchString: ''
                });
              }
              // Reset back to the "original" baseData
              else {
                $scope.data = $scope.baseData;

              }

            }
          }

          if (
            //$scope.searchable &&
            !$scope.ngHide &&
            ($scope.ngShow || typeof $scope.ngShow === 'undefined')

          ) {
            $timeout($scope.findAndShowSelectedItem);
          }

          return true;
        };

        /**
         * Need to make sure that if the current selected item in shown in the scroll window
         * If not, change its parent's scrollTop accordingly to make this happen
         */
        $scope.findAndShowSelectedItem = function () {
          //Need to check if the current selected item is outside of it's container
          var selectedItem = document.querySelector('.bento-combobox-container-list').querySelector('.selected');

          if (!!selectedItem) {
            var itemTop = selectedItem.offsetTop;
            var itemHeight = selectedItem.offsetHeight;
            var containerHeight = selectedItem.parentNode.parentNode.offsetHeight;
            var scrollTop = selectedItem.parentNode.parentNode.scrollTop;

            if (itemTop + itemHeight > containerHeight + scrollTop) {
              selectedItem.parentNode.parentNode.scrollTop = itemTop + itemHeight - containerHeight;
            } else if (itemTop < scrollTop) {
              selectedItem.parentNode.parentNode.scrollTop = itemTop;
            }
          }
        };

        /**
         * Filter search and populate items to data object
         * It also fires event to the parent controller for server processing with delays
         * @param str
         */
        var searchKeydownTimeout = $scope.searchKeydownTimeout || 1000; // is used to fire search after user idle
                                                                        // for (n) milliseconds
        var searchKeydownTimeoutID = 0; // timeout ID to clear when user enters the next character
        // prior to `searchKeydownTimeout`
        $scope.searchAndAddData = function (str) {

          // Set current selected value  to -1 so that the combobox resets
          $scope.currentSelectedIndex = -1;

          // Nothing to search
          // return the entire set
          if (str.length === 0) {
            $scope.inputLabelPreview = (!!$scope.placeholder) ? $scope.placeholder : '';
            $scope.data = $scope.baseData;
            return;
          }

          var minSearchCharacterCount = (!!$scope.minSearchCharacterCount) ? $scope.minSearchCharacterCount : 3;

          if ($scope.useServer && str.trim().length >= minSearchCharacterCount) {
            //Empty list and wait for server
            clearTimeout(searchKeydownTimeoutID);
            //Timed to fire event back to the parent controller
            searchKeydownTimeoutID = setTimeout(function () {
              if (!!$scope.onPageRequest) {
                $element.addClass('loading');
                // reset current pageIndex and prepare for scrolling
                $scope.onPageRequest({
                  searchString: str.trim(),
                  page        : $scope.currentLoadedPageIndex = 0
                });
                $scope.timeoutDigest();
                // Scroll the content back to top
                $scope.containerBody.scrollTop = 0;
                searched = true;
              }
            }, searchKeydownTimeout);
          }

          var re = new RegExp('(' + str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'i');
          var labelObject;
          $scope.data = [];

          // Do not search if there baseData is undefined
          if (!!$scope.baseData) {
            for (var i = 0; i < $scope.baseData.length; i++) {
              var item = $scope.baseData[i];

              labelObject = item[$scope.labelName];

              if (typeof labelObject === 'string') {
                if (item[$scope.labelName].search(re) !== -1) {
                  $scope.data.push(item);
                }
              } else {

                for (var j = 0; j < labelObject.length; j++) {
                  if (!!labelObject[j] && labelObject[j].search(re) !== -1) {
                    $scope.data.push(item);
                    break;
                  }
                }
              }
            }
          }
        };

        /**
         * Find out if the text in the inputLabel has a match in the model
         * @returns {boolean}
         */
        function hasInputLabelMatchIndex() {
          // No need to check
          // Always true
          if (!$scope.searchable) {
            return true;
          }

          if (!!$scope.baseData) {
            var labelText = $scope.inputLabel.trim();
            for (var i = 0; i < $scope.baseData.length; i++) {
              var item = $scope.baseData[i];
              var labelObject = item[$scope.labelName];

              if (typeof labelObject === 'string') {
                if (item[$scope.labelName] === labelText) {
                  return true;
                }
              } else {

                for (var j = 0; j < labelObject.length; j++) {
                  if (!!labelObject[j] && labelObject[j] === labelText) {
                    return true;
                  }
                }
              }
            }
          }

          return false;
        }

        /**
         * A timeout function to digest and watch basedata since it's not automatically checked
         * digestTimeoutID is used for other functions to terminate this timeout
         *
         * default timeout: 500ms
         */
        $scope.timeoutDigest = function () {
          digestWaitingCount++;
          clearTimeout(digestTimeoutID);

          // server timeout
          if (digestWaitingCount * digestTimeoutDuration < COMBOBOX_SERVER_TIMEOUT) {
            digestTimeoutID = setTimeout($scope.timeoutDigest, digestTimeoutDuration);
          } else {
            digestWaitingCount = 0;
            $element.removeClass('loading');
            $log.warn('Server timeout: no response for ' + Math.round(COMBOBOX_SERVER_TIMEOUT / 1000) + ' seconds.');
          }
          $bentoServices.safeApply($scope);
        };

        /**
         * Like htmlentities in PHP, it change special characters such as (>) into their encoded values (&lt;)
         */
        $scope.htmlEntities = function (str) {
          return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        };

        /**
         * Align headers to the table content
         */
        $scope.alignHeaders = function () {

          $timeout(function () {
            var header = $scope.bentoContainerProperties.containerHeader;//$element[0].querySelector('.bento-combobox-container-header');

            // This dropdown doesn't have headers
            if (!header) {
              return;
            }

            var headers = $scope.bentoContainerProperties.containerHeader.children;//$element[0].querySelector('.bento-combobox-container-header').children;
            var $headers = angular.element(headers);
            var container = $scope.bentoContainerProperties.containerItem;//$element[0].querySelector('.bento-combobox-container-item');

            // There is data in the table
            if (!!container) {
              var columns = container.children;

              if (columns[0].offsetWidth > 0) {
                //reset header styles
                $headers.removeAttr('style');

                for (var i = 0; i < headers.length; i++) {
                  if (i < headers.length - 1) {
                    headers[i].style.width = (i + 1 === headers.length) ?
                    (columns[i].offsetWidth - 20) + 'px' : // last header to avoid wrapping from padding
                    columns[i].offsetWidth + 'px';
                  }

                }
              } else {
                $headers.css('margin-right', '10px');
              }
            }
            // No item is populated in the container
            else {
              $headers.css('margin-right', '10px');
            }
          });
        };

        /**
         * Private function to change pages inthe dropdown
         */
        function changePage(direction) {
          // Get pointers and values for fast calculation
          var scrollContainer = $scope.bentoContainerProperties.containerBody;//$element[0].querySelector('.bento-combobox-container-body');
          var listItems = scrollContainer.getElementsByClassName('bento-combobox-container-item');
          var containerHeight = scrollContainer.offsetHeight;
          var itemHeight = listItems[0].offsetHeight;
          var indexToSelect;

          // No need to scroll up
          if (scrollContainer.scrollTop < containerHeight && direction === COMBOBOX_PAGE_UP) {
            $scope.currentSelectedIndex = 0;
            $scope.selectItem($scope.currentSelectedIndex, true);
            return;
          } else
          // No need to scroll down
          if (scrollContainer.scrollTop + 2 * containerHeight > scrollContainer.scrollHeight &&
            direction === COMBOBOX_PAGE_DOWN && !$scope.useServer
          ) {
            $scope.currentSelectedIndex = $scope.data.length - 1;
            $scope.selectItem($scope.currentSelectedIndex, true);
            return;
          }

          // Scroll the list first
          scrollContainer.scrollTop = scrollContainer.scrollTop + direction * containerHeight;
          // Calculate the next index to select when a `Page Up` or a `Page Down` button is pressed
          indexToSelect = direction === COMBOBOX_PAGE_DOWN ?
            Math.floor(scrollContainer.scrollTop / itemHeight) :
            Math.floor((scrollContainer.scrollTop + containerHeight) / itemHeight);

          // No need to reselect since the selected item is in view
          if (typeof listItems[indexToSelect] !== 'undefined' && !isItemShownInScrollContainer(listItems[indexToSelect], scrollContainer.scrollTop, containerHeight)
          ) {
            // Pre-select the item based on the calculation
            $scope.currentSelectedIndex = indexToSelect;
            $scope.selectItem($scope.currentSelectedIndex, true);
          }
        }

        /**
         * Private function to check if an item is outside of the scroll view
         */
        function isItemShownInScrollContainer(item, scrollTop, containerHeight) {

          // If an item's top or bottom is out of the bound -> return false
          if (item.offsetTop < scrollTop || item.offsetTop + item.offsetHeight > scrollTop + containerHeight) {
            return false;
          }

          // nothing is outside
          return true;
        }

        /**
         * Private functions for focus out listeners
         */
        //TODO: Update all `addEventListener` to angularJS based events for better testing
        function addWindowFocusOutListener() {
          if (!!addedEventListeners.click) {
            return;
          }
          isFocused = true;
          window.addEventListener('click', onWindowClick);
          addedEventListeners.click = onWindowClick;
        }

        function checkValueOnFocusOut() {
          // One last check for input field to make sure there is a match
          if (!hasInputLabelMatchIndex()) {
            if ($attrs.selectedIndex) {
              $scope.selectedIndex = -1;
            }

            $scope.currentSelectedIndex = -1;

            $scope.onChange({
              index: -1
            });
          }

          // Clear the label when there is nothing selected
          if ($scope.currentSelectedIndex === -1) {
            $scope.inputLabel = '';
            $scope.inputLabelPreview = (!!$scope.placeholder) ? $scope.placeholder : '';

            // reset data
            if ($scope.useServer) {
              if (!!$scope.onPageRequest) {
                $element.addClass('loading');
                // reset current pageIndex and prepare for scrolling
                $scope.onPageRequest({
                  searchString: '',
                  page        : 0
                });
                $scope.timeoutDigest();
                searched = true;
              }
            } else {
              $scope.data = $scope.baseData;
            }

          }

        }

        function removeWindowFocusOutListener() {
          window.removeEventListener('click', onWindowClick);
          addedEventListeners.click = null;
          isFocused = false;
          $bentoServices.safeApply($scope);
        }

        function onWindowClick(event) {
          if (!$element[0].contains(event.target)) {
            if ($scope.isContainerVisible) {
              $scope.isContainerVisible = false;
              $bentoServices.safeApply($scope);
            }
            checkValueOnFocusOut();
            removeWindowFocusOutListener();
          }
        }
      }
    ])
  /**
   * DIRECTIVE: bentoCombobox
   */
    .
    directive('bentoCombobox', ['$document', '$timeout', function ($document, $timeout) {
      return {
        controller: 'bentoComboboxControl',
        scope     : {
          valueName              : '@',
          labelName              : '@',
          placeholder            : '@',
          inputValue             : '=ngModel',
          baseData               : '=data',
          searchable             : '=',
          type                   : '&',
          useServer              : '=',
          onPageRequest          : '&',
          onChange               : '&',
          selectedIndex          : '=?',
          disabled               : '=',
          resetListOnSelect      : '&',     // Flag to determine whether to reset the list when a selection is made
          headers                : '&',     // headers
          minSearchCharacterCount: '=',     // Determines minimum character count to trigger server search
          ignoreInputClick       : '=',     // To ignore click even for the input field
          ngHide                 : '=',     // Track ng-hide
          ngShow                 : '=',     // Track ng-show
          searchKeydownTimeout   : '='      // Expose local `searchKeydownTimeout` to let dev to control the delay
                                            // before the search starts

        },

        templateUrl: '../templates/combobox/bento-combobox.html',
        transclude : true,
        replace    : true,
        link       : function (scope, element, attrs, controller, transclude) {
          //Hide Footer transclude when there is nothing to include
          transclude(scope, function (source) {
            if (source.text().trim().length === 0) {
              angular.element(element[0].querySelector('.bento-combobox-container-footer')).addClass('ng-hide');
            }
          });

          // forces removal of disabled attribute when
          // disabled is not explicitly set to true
          if (!!attrs.disabled && !scope.disabled) {
            element.removeAttr("disabled");
          }

          var listContainerElement = element.find('.bento-combobox-container');
          if(listContainerElement) {
            listContainerElement.addClass('bento-append-to-parent');
          }

          $timeout(function () {
            
            if(!scope.bentoContainerProperties.containerHeader) {
              scope.bentoContainerProperties.containerHeader = element[0].querySelector('.bento-combobox-container-header');
            }

            if(!scope.bentoContainerProperties.containerBody) {
              scope.bentoContainerProperties.containerBody = element[0].querySelector('.bento-combobox-container-body');
            }

            if(!scope.bentoContainerProperties.containerItem) {
              scope.bentoContainerProperties.containerItem = element[0].querySelector('.bento-combobox-container-item');
            }
          });
        }
      };
    }])
    ;
})(window.angular);