/**
 * Bento Date Picker NG
 *
 */

(function (angular, window, undefined) {

  "use strict";

  angular.module('bento.datepickerLocaldate', [])
  .directive('datepickerLocaldate', ['$parse', '$log', function ($parse, $log) {
        var directive = {
            restrict: 'A',
            require: ['ngModel'],
            link: link
        };
        return directive;
 
        function link(scope, element, attr, ctrls) {
      
            var ngModelController = ctrls[0];
      
            // called with a JavaScript Date object when picked from the datepicker
            ngModelController.$parsers.push(function (viewValue) {
                $log.debug("Date converted to localtime: ", moment.utc(new Date(viewValue)).format());;
                return moment.utc(new Date(viewValue)).format();
            });
            
            // called with a 'yyyy-mm-dd' string to format
            ngModelController.$formatters.push(function (modelValue) {
                if (!modelValue) {
                    return undefined;
                }
                var dt = moment.utc(new Date(modelValue)).format();
                return dt;
            });
        }
    }]);
})(window.angular, window);
