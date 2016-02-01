/**
 * Bento Alerts
 *
 * @author Jaganlal Thoppe <jaganlal.thoppe@thomsonreuters.com>
 * @version 0.1
 * @date 10/03/2015
 *
 * This alerts are called - Next-Gen Alerts
 *
 * 1. The alert box got smaller (to save some real estate). It is very similar to Gmail notifications style.
 *
 * 2. Added drop shadow behind the box so it never gets lost no matter what the background is.
 *
 * 3. Alert appears towards the top of the screen, so that it doesn’t cover up data but it also doesn’t push 
 * content down. Alerts always appear in this spot for consistency purposes.
 *
 * 4. Fade away feature is optional and timing can be customized.
 *
 */

(function(window, angular) {
  'use strict';

  angular.module('bento.alert', [])

  .controller('BentoAlertController', [
    '$scope',
    function($scope) {
      $scope.closeBentoAlert = function(index) {
        $scope.bentoAlertObject.splice(index, 1);
      };
      
      // Access through controller
      this.closeBentoAlert = function(alert){
        $scope.closeBentoAlert($scope.bentoAlertObject.indexOf(alert));
      }
    }
  ])

  .directive('bentoAlert', [
    '$compile',
    '$timeout',

    function($compile, $timeout) {

      return {
        restrict: 'EA',
        controller: 'BentoAlertController',
        templateUrl: '../templates/alerts/bento_alert.html',
        scope: {
          bentoAlertObject: '='
        } //scope
      }; //return
    } //function compile, timeout
  ])

  .directive('bentoAlertTimeoutWithObject', ['$timeout', function($timeout) {
    return {
      require: '^bentoAlert',
      scope:{
        bentoAlertTimeoutWithObject: '='
      },
      link: function(scope, element, attrs, alertCtrl) {
        var alertTimeout = Number(scope.bentoAlertTimeoutWithObject.timeout);

        // There is no timeout
        if(typeof scope.bentoAlertTimeoutWithObject.timeout === 'undefined'){
          return;
        }
        // Fire the timeout
        $timeout(function() {
          alertCtrl.closeBentoAlert(scope.bentoAlertTimeoutWithObject);
        }, alertTimeout); //timeout
      } //link function
    }; //return
  }]);

})(window, window.angular);
