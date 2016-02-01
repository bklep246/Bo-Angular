/**
 * Bento Progressbar NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.1
 * @date 08/20/2014
 *
 *
 */


(function(angular, undefined) {
    'use strict';

    angular
        .module('bento.progressbar', [
           'bento.services',
        ])
        .controller('BentoProgressbarController', ['$scope',
            function($scope) {
                $scope.$watch('value',function(val){
                    $scope.dynamic = val;
                },true)
                $scope.$watch('type',function(val){
                    $scope.barType = val;
                },true)
            }
        ])
        .directive('bentoProgressbar', [ 
            function() {
                return {
                    restrict: 'EA',
                    scope: {
                        value: '=',
                        animate: '=',
                        type: '='
                    },
                    templateUrl: '../templates/progressbar/bento-progressbar.html',
                    controller: 'BentoProgressbarController',
                    link: function(scope, element, attrs) {
                    }
                };
            }
        ])
})(window.angular);
