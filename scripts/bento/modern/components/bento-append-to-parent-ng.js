/**
 * Bento Append To Parent NG
 *
 * @author Jaganlal Thoppe <jaganlal.thoppe@thomsonreuters.com>
 * @version 0.1
 * @date 15/04/2015
 *
 * This is a helper directive which can be used along with `bento.combox` to append it to its parent element.
 * To use append-to-parent feature, your directive must do the following
 * 1. Add '.bento-append-to-parent' class to the list container
 * 2. $emit 'append_to_parent_show_list' event when the list needs to be shown or hidden
 * 
 * Changelog:
 *
 * 16/04/2015
 * - Making this directive generic to work with bento.combox & dropdown
 * - waiting on 'append_to_parent_show_list' event to update container position
 */

(function (window, angular, undefined) {

  "use strict";

  angular.module('bento.append.to.parent', [])
  .
  directive('bentoAppendToParent', ['$log', '$bentoServices', function ($log, $bentoServices) {
    return {
      link: function(scope, element, attrs, ctrl) {

        /*
        * flag to make sure its not appended to the parent element more than once
        */
        var elementAttached = false;

        /*
        * The element where 'append-to-parent' is added
        */
        var thisElement = element[0];

        /*
        * Patch for IE 9 - If the appendToContainer's position is static, need to make it relative.
        */
        var oldAppendToContainerPosition = "";

        var appendTo = attrs.bentoAppendToParent;
        if(appendTo.length <= 0) { //default it to body
          appendTo = "body";
        }

        var appendToContainer = document.querySelector(appendTo);
        if(!appendToContainer) { //to make it work between site and dev
          appendTo = "body";
          appendToContainer = document.querySelector(appendTo);
        }

        /*
        * This element holds/contains the list element (ul/ol)
        */ 
        var listContainerElement = element[0].querySelector('.bento-append-to-parent');
        if(!listContainerElement || listContainerElement === undefined) {
          $log.warn('bento-append-to-parent: Container class does not have "bento-append-to-parent" class');
          return;
        }

        /*
        * Directive along with its used will emit 'append_to_parent_show_list' event when the list needs to be shown or hidden
        */
        scope.$on("append_to_parent_show_list", function (e, flag) {
          if(typeof flag !== 'boolean') {
            $log.warn('bento-append-to-parent: "append_to_parent_show_list" flag needs to be boolean');
            return;
          }

          if(flag) { //list is visible
            updateContainerPosition();
          }
          else { //list is hidden
            resetContainerPosition();
          }
        });

        window.addEventListener('resize', function (event) {
          updateContainerPosition();
        }); // resize - event listener

        /*
        * 1. Append list container element to its parent (specified by append-to-parent)
        * 2. Calculate list container element's placement position when it needs to be shown
        */
        function updateContainerPosition() {
          var rect = thisElement.getBoundingClientRect();
          var appendToContainerRect = appendToContainer.getBoundingClientRect();

          listContainerElement.style.top = ((rect.top+rect.height-appendToContainerRect.top)-1)+"px";
          listContainerElement.style.left = rect.left-appendToContainerRect.left+"px";
          listContainerElement.style.width = rect.width+"px";
          listContainerElement.style.zIndex = 10;

          if(!elementAttached) { //logic to attach only once

            // Check if the browser is IE 9
            if ($bentoServices.getIEVersion() === 9) {
              var style = window.getComputedStyle(appendToContainer, null);

              if(style.position.length <= 0 || style.position === 'static') {
                oldAppendToContainerPosition = style.position;
                appendToContainer.style.position = 'relative';
              }
            }

            appendToContainer.appendChild(listContainerElement);
            elementAttached = true;
          }
        }

        /*
        * reset all style
        */
        function resetContainerPosition() {
          listContainerElement.style.top = "";
          listContainerElement.style.left = "";
          listContainerElement.style.width = "";
          listContainerElement.style.zIndex = 0;
        }

        /*
        * Remove the child when the directive is destroyed. 
        * Otherwise if attached to 'body', duplicate children (zombies) will
        * be seen when the body element is inspected.
        */
        element.on('$destroy', function() {
          if(elementAttached && appendToContainer) {
            appendToContainer.removeChild(listContainerElement);

            // Check if the browser is IE 9
            if ($bentoServices.getIEVersion() === 9) {
              appendToContainer.style.position = oldAppendToContainerPosition;
            }
          }
        });

      } //link 
    } //return
  
  }]); //bentoAppendToBody directive
})(window, window.angular);