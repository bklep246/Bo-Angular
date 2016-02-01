/**
 * Bento Services NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.3
 * @date 17/04/2015
 *
 * Provides various services
 *
 * Changelog:
 *
 * 17/04/2015
 * - getBentoJSRoot is updated with fallbacks
 *
 * 12/08/2014
 * `getBentoJSRoot` is updated to potentially support Bundling
 *
 *
 * 12/05/2014
 * initial build
 * Required for i18n directive support
 *
 */
/* jshint -W044 */
(function (angular) {

  'use strict';

  // This greatly helps finding out the current JS file / Bento Frameworks location
  // and a possible solution to bundling issues with the i18n files
  var jsScripts = document.getElementsByTagName("script");
  var currentJSFileSrc = jsScripts[jsScripts.length - 1].src;

  /**
   * Bento Service Module
   */
  angular.module('bento.services', [])
  /**
   * Config the whole framework
   */
    .config([
      function () {
        // This is redundant but we'll use it for the time been
        var msTouchEnabled = window.navigator.msMaxTouchPoints;
        var generalTouchEnabled = "ontouchstart" in document.createElement("div");

        if (msTouchEnabled || generalTouchEnabled) {
          angular.element(document.getElementsByTagName('body')).addClass('touch');
        }

        // Adding os name to body
        var OSName = navigator.appVersion;
        var os = 'unknown-os';
        if (OSName.indexOf("Win") !== -1) {
          os = 'win';
        } else if(/(iPad|iPhone|iPod)/g.test( navigator.userAgent )) {
          os = 'ios';
        } else if (OSName.indexOf("Mac") !== -1) {
          os = 'mac';
        } else if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
          os = 'android';
        } else if (OSName.indexOf("X11") !==-1) {
          os = 'unix';
        } else if (OSName.indexOf("Linux") !== -1) {
          os = 'linux';
        } else if (OSName.indexOf("SunOS") !== -1) {
          os = 'solaris';
        }

        angular.element(document.getElementsByTagName('body')).addClass(os);

        // Adding brower name and version to body
        var isOpera = !!window.opera || (navigator && navigator.userAgent.indexOf(' OPR/') >= 0);
        var isFirefox = typeof InstallTrigger !== 'undefined';
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        var isMobileSafari = (navigator.userAgent && (navigator.userAgent.search("Mobile") > -1) && (navigator.userAgent.search("Safari") > -1));
        var isChrome = !!window.chrome && !isOpera;
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var browser = 'unknown-browser';
        var browserVersion = 'unknown-browser-version';

        if(isMobileSafari){
          browser = 'mobile_safari';
          browserVersion = browser+navigator.userAgent.match(/version\/(\d+)/i)[1];
        }else if(isOpera){
          browser = 'opera';
          browserVersion = browser+window.opera.version();
        }else if(isFirefox && navigator.userAgent){
          browser = 'firefox';
          browserVersion = browser+navigator.userAgent.match(/firefox\/(\d+)/i)[1];
        }else if(isSafari && navigator.userAgent.search('version') !== -1){
          browser = 'safari';
          browserVersion = browser+navigator.userAgent.match(/version\/(\d+)/i)[1];
        }else if(isChrome && navigator.userAgent){
          browser = 'chrome';
          browserVersion = browser+navigator.userAgent.match(/chrome\/(\d+)/i)[1];
        }else if(isIE && navigator.userAgent){
          browser = 'ie';
          if(navigator.userAgent.search('like Gecko') !== -1){
            browserVersion = browser+'11';
          }else{
            browserVersion = browser+navigator.userAgent.match(/msie\ (\d+)/i)[1];
          }
        }else if(isOpera) {
          browser = 'opera';
          if (window.opera) {
            browserVersion = browser + window.opera.version();
          } else {
            browserVersion = browser + navigator.userAgent.match(/ OPR\/(\d+)/i)[1];
          }
        }

        angular.element(document.getElementsByTagName('body')).addClass(browser);
        angular.element(document.getElementsByTagName('body')).addClass(browserVersion);

      }
    ]
  )
  /**
   * FILTER: Highlight a substring that matches the value and return it with <strong></strong>
   */
    .filter('highlight', function () {

      /**
       * @param str - input string
       * @param value - search string
       * @paran bypass - bypass highlighting
       */
      return function (_str, value, bypass) {

        if (value === '' || typeof value === 'undefined' || bypass) {
          return _str;
        }

        var str = _str || '';
        var newStr;
        var re = new RegExp('(' + value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'gi');
        newStr = str.replace(re, '<span class="matching-text-highlight">$&</span>');

        return newStr;
      };
    })  /**
   * BentoService Factory to provide various services and utilities
   */
    .factory('$bentoServices', [
      '$window',
      '$timeout',
      function ($window, $timeout) {

        /**
         * isTouchSupported
         * @returns {boolean}
         *
         * Check of the current device is touch friendly
         *
         */
        var isTouchSupported = function () {
          var msTouchEnabled = window.navigator.msMaxTouchPoints;
          var generalTouchEnabled = "ontouchstart" in document.createElement("div");

          return msTouchEnabled || generalTouchEnabled;
        };

        /**
         * safeApply a function on a scope
         * @param scope
         * @param fn
         *
         */
        var safeApply = function (scope, fn) {
          var phase = scope.$root.$$phase;
          if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            scope.$apply(fn);
          }
        };

        /**
         * getIEVersion
         * @returns {number}
         *
         * Returns the version of Internet Explorer or a -1
         * (indicating the use of another browser).
         */
        var getIEVersion = function () {
          var rv = -1; // Return value assumes failure.
          var ua;
          var re;
          if (navigator.appName === 'Microsoft Internet Explorer') {

            ua = navigator.userAgent;
            re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
              rv = parseFloat(RegExp.$1);
            }
          } else if (navigator.appName === 'Netscape') {
            ua = navigator.userAgent;
            re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
              rv = parseFloat(RegExp.$1);
            }
          }

          return rv;
        };

        /**
         * Generate an unique numeric ID
         */
        function generateUID() {
          return Math.round(Math.random() * 10000000).toString() + Math.round(Math.random() * 10000000).toString();
        }

        /**
         * This is a port to angularJS v1.2.11 and up $$rAF for temporary use
         * @param callBackFunc
         * @returns {Function}
         * @constructor
         */
        function RAFProvider(callBackFunc) {

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
        }

        /**
         * Check if a keyCode is printable
         * @param keyCode
         * @returns {boolean}
         */
        function isPrintableKeyCode(keyCode) {
          return (keyCode > 47 && keyCode < 58) || // number keys
            keyCode === 32 || keyCode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
            (keyCode > 64 && keyCode < 91) || // letter keys
            (keyCode > 95 && keyCode < 112) || // numpad keys
            (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
            (keyCode > 218 && keyCode < 223);   // [\]' (in order)
        }

        return {
          // Returns current IE version
          getIEVersion      : getIEVersion,
          // rAF for animation
          rAF               : RAFProvider,
          // Detect retina displays
          retina            : $window.devicePixelRatio > 1,
          // Check if the device is touch supported
          isTouchSupported  : isTouchSupported,
          // Generate a numeric uniqueID
          generateUID       : generateUID,
          // Fire scope.$apply safely
          safeApply         : safeApply,
          // Check if a keyCode is printable
          isPrintableKeyCode: isPrintableKeyCode
        };

      }])
  /**
   * Help directive recursions without running into stack overflow on string replace
   */
    .factory('$recursionHelper', ['$compile', function ($compile) {
      return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function (element, link) {
          // Normalize the link parameter
          if (angular.isFunction(link)) {
            link = {post: link};
          }

          // Break the recursion loop by removing the contents
          var contents = element.contents().remove();
          var compiledContents;
          return {
            pre : (link && link.pre) ? link.pre : null,
            /**
             * Compiles and re-adds the contents
             */
            post: function (scope, element) {
              // Compile the contents
              if (!compiledContents) {
                compiledContents = $compile(contents);
              }
              // Re-add the compiled contents to the element
              compiledContents(scope, function (clone) {
                element.append(clone);
              });

              // Call the post-linking function, if any
              if (link && link.post) {
                link.post.apply(null, arguments);
              }
            }
          };
        }
      };
    }])
  /**
   * Provider: Provide Bento JS Root
   */
    .provider('$bentoJSRoot', function () {
      var bentoJSRootLink;
      var _this = this;

      /**
       * configAngularTranslateProvider
       * @param componentName
       * @param $translateProvider
       * @param $bentoTranslateLoaderProvider
       * @param defaultLanguage
       *
       * Configures $translateProvider for multilingual support
       */
      this.configAngularTranslateProvider = function (componentName, $translateProvider, $bentoTranslateLoaderProvider, defaultLanguage) {
        //Setup Bento Translate Loader
        //
        // Concert Example:
        //
        // $bentoTranslateLoaderProvider.addURLPattern('components/languages/lang-{lang}.js');
        //
        $bentoTranslateLoaderProvider.addURLPattern(_this.getBentoJSRoot(componentName) + 'i18n/' + componentName + '-{lang}.json');

        // Use Bento Translate Loader
        $translateProvider.useLoader('$bentoTranslateLoader');

        // Default all languages to en_us for the time been
        if (!!defaultLanguage) {
          $translateProvider.preferredLanguage(defaultLanguage.replace('-', '_').toLowerCase());
        } else {
          $translateProvider.preferredLanguage('en');
        }

        $translateProvider.translationNotFoundIndicatorLeft('!');
        $translateProvider.translationNotFoundIndicatorRight('!');

        $translateProvider.fallbackLanguage(defaultLanguage);
      };

      /**
       * getBentoJSRoot
       * @param elementName
       * @returns {string}
       */
      this.getBentoJSRoot = function (elementName) {
        var bentoLinks = document.querySelectorAll('script[src]');  //document.querySelector('script[src~="/bento-"');
        var index = -1;
        for (var i = 0; i < bentoLinks.length; i++) {

          if (bentoLinks[i].attributes['src'].value.search('/' + elementName) != -1) {
            index = i;
            break;
          } else if (bentoLinks[i].attributes['src'].value.search('components/bento-modern.') != -1) {
            index = i;
            break;
          }
        }

        // currentJSFileSrc is a Global variable to this JS file
        // Check if bento-modern is loaded individually
        var bentoLinkTemp = (index === -1)?
          // Death start approach
          currentJSFileSrc.split('/') :
          // Found it!
          bentoLinks[index].src.split('/');
        bentoLinkTemp.pop();
        bentoJSRootLink = bentoLinkTemp.join('/') + '/';

        return bentoJSRootLink;
      };

      /**
       * Turn on or of Full Console Error reporting where Chrome omits most of the outputs
       * @param bool
       */
      this.turnOnFullErrorReporting = function (bool) {
        if (bool) {
          //Chrome passes the error object (5th param) which we must use since it now truncates the Msg (1st param).
          window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
            var errMsg;
            //check the errorObject as IE and FF don't pass it through (yet)
            if (errorObject && errorObject !== undefined) {
              errMsg = errorObject.message;
            }
            else {
              errMsg = errorMsg;
            }
            window.console.log('Full Error: ' + errMsg);
          };
        } else {
          window.onerror = null;
        }
      };

      this.$get = [function () {
        return bentoJSRootLink;
      }];
    });

})(window.angular);