/**
 * Bento Translate Loader NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 05/20/2014
 *
 * Initial Loader
 *
 */

(function(angular){

  'use strict';

  var translateApp = angular.module('pascalprecht.translate');

  translateApp
    .provider('$bentoTranslateLoader',function(){
      var urlPatterns = [];

      // Pushing a new pattern onto the pattern stack for loading later
      this.addURLPattern = function(pattern){
        urlPatterns.push(pattern);
      };

      /**
       * Loader Factory
       * @type {*[]}
       */
      this.$get = ['$http', '$q', function($http, $q){
        // return loaderFn
        return function (options) {

          var deferred = $q.defer();
          var filePatternArray = urlPatterns.slice(0);
          var languageData = {};
          var counter = 0;

          loadLanguageFile();

          function loadLanguageFile(){
            // pop and get the top time from the stack
            var url = filePatternArray.pop().replace('{lang}',options.key);
            $http({method: 'GET', url: url}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                addAndCheckFile(data);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                addAndCheckFile();
              });
          }

          function addAndCheckFile(data){

            if(!!data) {
              for (var key in data) {
                if(!!data[key]) {
                  languageData[key] = data[key];
                  counter += 1;
                }
              }
            }

            if(filePatternArray.length > 0){
              loadLanguageFile();
            }else{
              if(counter > 0){
                deferred.resolve(languageData);
              }else{
                deferred.reject(options.key);
              }
            }
          }
          return deferred.promise;
        };
      }];
    });

})(window.angular);
