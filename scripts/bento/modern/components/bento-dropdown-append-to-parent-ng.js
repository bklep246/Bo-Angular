/**
 * Bento Dropdown AppendToParent NG
 *
 * @author Jaganlal Thoppe <jaganlal.thoppe@thomsonreuters.com>
 * @version 0.1
 * @date 16/04/2015
 *
 *
 */

(function (window, angular, undefined) {

  'use strict';

  angular.module('bento.dropdown.append.to.parent', [])


   /**
   * Directive declaration
   */
    .directive('bentoDropdownAppendToParent', [
    function () {
      return {
        require: '^dropdown',
        link: function (scope, element, attrs, dropdownCtrl) {

          var listContainerElement = element.find('.dropdown-menu');
          if(listContainerElement) {
            listContainerElement.addClass('bento-append-to-parent');
          }

          scope.$watch(dropdownCtrl.isOpen, function(isOpen) {

            if(typeof isOpen === 'boolean') {
              scope.$emit("append_to_parent_show_list", isOpen);
            }
          });
        }
    };
  }]);
})(window, window.angular);
