/**
 * Bento Busy Loader NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1.2
 * @date 23/10/2014
 *
 * Changelog:
 *
 * 23/10/2014
 * Bug Fix:
 * - [CXUI-342] Busy Loader positioning override issue reported by Tony Foster
 *   Link: https://thehub.thomsonreuters.com/message/348770#348770
 *
 * 10/07/2014
 * Directive `busyLoader` is added
 *
 * 11/06/2014
 * Initial build
 *
 */
/* jshint -W016 */
(function (window, angular, undefined) {

  'use strict';

  angular.module('bento.busyloader',['bento.services'])
  /**
   * Config to add $http interceptions
   */
    .config([
      '$provide',
      '$httpProvider',
      function($provide, $httpProvider){

        /**
         * Register a new interceptor for Busy Loader for auto show and hide
         */
        $provide.factory('bentoBusyLoaderHttpInterceptor',[
          '$q',
          '$log',
          function($q, $log){

            /**
             * Get a BentoBusyLoader from the config file, undefined otherwise
             * @param config
             * @returns {*}
             */
            var getBusyLoader = function(config){
              // There is nothing assigned to config
              if(typeof config === 'undefined'){
                return undefined;
              }

              // Make sure busyLoader is assigned as part of the config object
              // And the object is a `BentoBusyLoader` instance
              if(!!config.busyLoader){
                return config.busyLoader;
              }else{
                return undefined;
              }
            };

            /**
             * Show the Busy Loader referenced from the config object
             * @param config
             */
            var showBusyLoader = function(config){
              var busyLoader = getBusyLoader(config);

              if(!!busyLoader){
                busyLoader.show();
              }
            };

            /**
             * Hides the Busy Loader referenced from the config object
             * @param config
             */
            var hideBusyLoader = function(config){
              var busyLoader = getBusyLoader(config);

              if(!!busyLoader){
                busyLoader.hide();
              }
            };

            /**
             * Return all $http interception results
             */
          return{
            // optional method
            'request': function(config) {
              // do something on success
              showBusyLoader(config);
              return config;
            },

            // optional method
            'requestError': function(rejection) {
              // do something on error
              //hideBusyLoader(rejection.config);

              return $q.reject(rejection);
            },

            // optional method
            'response': function(response) {
              // do something on success
              hideBusyLoader(response.config);
              return response;
            },

            // optional method
            'responseError': function(rejection) {
              // do something on error
             // hideBusyLoader(rejection.config);

              return $q.reject(rejection);
            }
          };

        }]);

        // Push the interceptor to $httpProvider.interceptor stack
        $httpProvider.interceptors.push('bentoBusyLoaderHttpInterceptor');

      }
    ])
  /**
   * Provides Busy Loader services
   */
    .factory('$bentoBusyLoader', [
      '$timeout',
      '$log',
      '$q',
      '$bentoServices',
      function ($timeout, $log, $q, $bentoServices) {

        // Busy Loader Object
        function BentoBusyLoader(_dom, _size) {
          // Normalize DOM type
          var id = Math.round(Math.random() * 10000000000);
          var dom = typeof _dom === 'string' ? document.querySelector(_dom) : _dom;
          var bgSize = '';
          var canvasSize;
          var loaderSize;

          // Now we can set the size of the spinner animation
          switch (_size) {
            case 'small' :
              loaderSize = canvasSize = 24;

              break;
            case 'large':
              loaderSize = canvasSize = 75;
              break;
            default:
              loaderSize = canvasSize = 50;
          }

          // We double the canvas density for retina displays
          loaderSize *= 2;

          // Create loader dom elements
          var loader = angular.element('<div ' +
                                       'id="bento-busyloader-' + id + '" ' +
                                       'class="bento-busyloader-blocker hide ' + bgSize + '">' +
                                       '<div class="bento-busyloader-wrapper"><div class="bento-busyloader-inner">' +
                                       '<canvas id="bento-busyloader-spinner-' + id + '" ' +
                                       'class="bento-busyloader-canvas" ' +
                                       'style="width: '+canvasSize+'px; height: '+canvasSize+'px;"></canvas>' +
                                       '</div></div>' +
                                       '</div>');

          // Insert loader HTML code into the DOM
          var mainDom = angular.element(dom);
          var mainDomPosition = window.getComputedStyle(mainDom[0]).position.trim();

          // Check and assign `relative` position where it is at default, `static`
          if (mainDomPosition.length === 0 || mainDomPosition === 'static') {
            mainDom[0].style.position = "relative";
          }

          // Adding loader
          mainDom.append(loader);

          this.show = function (delay) {
            var deferred = $q.defer();
            var _delay = (typeof delay === 'undefined') ? 0 : parseInt(delay, 10);
            $timeout(function () {
              loader.removeClass('hide');
              // canvas render disabled
              startAnimate();

              deferred.resolve('Busy Loader is now bocking content');
            }, _delay);

            return deferred.promise;
          };

          this.hide = function (delay) {
            var _delay = (typeof delay === 'undefined') ? 0 : parseInt(delay, 10);
            var deferred = $q.defer();
            $timeout(function () {
              loader.addClass('hide');
              isAnimating = false;

              deferred.resolve('Busy Loader is now hidden');
            }, _delay);


            return deferred.promise;

          };

          // Canvas spinner animation code
          // rFA is used for animation part to minimize CPU load
          var canvas;
          var context;
          var radius = loaderSize * 0.4;
          var duration = 2000;
          var transition = 200;
          var transitionOut = 200;
          var counterClockwise = false;
          var x, y;
          var color1 = 0x606060;
          var color2 = 0xfea520;
          var color1R = 0x60;
          var color1G = 0x60;
          var color1B = 0x60;
          var color2R = 0xfe;
          var color2G = 0xa5;
          var color2B = 0x20;
          var dColorR = color2R - color1R;
          var dColorG = color2G - color1G;
          var dColorB = color2B - color1B;
          var colorStepR = dColorR / transition;
          var colorStepG = dColorG / transition;
          var colorStepB = dColorB / transition;
          var colorStepROut = dColorR / transitionOut;
          var colorStepGOut = dColorG / transitionOut;
          var colorStepBOut = dColorB / transitionOut;
          var startTime;
          var isAnimating = false;
          var segments = 5;
          var keyTime = duration / segments;
          var gap = 0.1;
          var startAngle = (-0.5 + gap * 0.5) * Math.PI;
          var step = 2 / segments;

          function startAnimate(){
            isAnimating = true;
            startTime = (new Date()).getTime();
            render();
          }

          function initSpinner() {
            canvas = document.getElementById('bento-busyloader-spinner-' + id);
            context = canvas.getContext('2d');
            canvas.width = loaderSize;
            canvas.height = loaderSize;
            context.lineWidth = loaderSize * 0.2;
            x = canvas.width / 2;
            y = canvas.height / 2;
          }


          function render(){
            var dTime = ((new Date()).getTime() - startTime) % duration;
            context.clearRect(0,0,200,200);

            for(var i=0; i <segments; i++) {
              renderSegment(i, dTime);
            }

            if(isAnimating){
              $bentoServices.rAF(renderAsync);
            }
          }

          function renderAsync() {
            setTimeout(function () {
              render();
            }, 1);
          }

          function renderSegment(index, dTime) {
            var newColorR,
                newColorG,
                newColorB,
                newColor;

            var inTime = Math.round(index * keyTime);
            var outTime = Math.round(inTime + keyTime);

            if(dTime >= inTime && dTime <= inTime + transition ) {
              var inDTime = dTime - inTime;
              newColorR = color1R + Math.floor(colorStepR * inDTime);
              newColorG = color1G + Math.floor(colorStepG * inDTime);
              newColorB = color1B + Math.floor(colorStepB * inDTime);

              newColor = (newColorR << 16 | newColorG << 8 | newColorB);
            }else if((dTime >= outTime && dTime <= outTime + transitionOut) ||
                     (dTime <= transitionOut && index === segments - 1 )){
              var outDTime = transitionOut - dTime - outTime ;
              //outTime = outDTime < 0 ? dTime : outTime;
              newColorR = color1R + Math.floor(colorStepROut * outDTime);
              newColorG = color1G + Math.floor(colorStepGOut * outDTime);
              newColorB = color1B + Math.floor(colorStepBOut * outDTime);
              newColor = (newColorR << 16 | newColorG << 8 | newColorB);
            }else if(dTime > inTime + transition && dTime < outTime){
              newColor = color2;
            }else{
              newColor = color1;
            }

            context.beginPath();
            context.arc(
              x,
              y,
              radius,
              startAngle + index * step * Math.PI,
              startAngle + ((index+1) * step - gap) * Math.PI,
              counterClockwise);

            // line color
            context.strokeStyle = '#'+newColor.toString(16);
            context.stroke();

          }

          $timeout(initSpinner);
        }

        var getNewLoader = function (dom, size) {
          return new BentoBusyLoader(dom, size);
        };

        // Finally return the actual loader
        return {
          getNewLoader: getNewLoader
        };
      }])
    .directive('busyLoader',[
      '$bentoBusyLoader',
      '$log',
      function($bentoBusyLoader, $log){

        return {
          scope:{
            busyLoader : '&',  //get Busy Loader state
            busyLoaderSize: '@' //define the size of BL
          },
          link: function(scope, element, attr){

            var busyLoader = $bentoBusyLoader.getNewLoader(element, scope.busyLoaderSize);

            if(typeof scope.busyLoader === 'undefined'){
              $log.error('Bento Busy Loader: Variable is not defined for this directive.');
            }

            // Watch loader variable
            scope.$watch('busyLoader()',function(newVal){
              if(newVal){
                busyLoader.show();
              }else{
                busyLoader.hide();
              }
            });
          } // end of link
        };
      }
    ]);
})(window, window.angular);
