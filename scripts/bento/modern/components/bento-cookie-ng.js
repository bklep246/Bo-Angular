/**
 * Bento Cookie NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 05/21/2014
 *
 * Initial Build
 *
 */

(function(angular){

  'use strict';

  angular.module('bento.cookie',[])
    .provider('$bentoCookie', function(){

      this.getCookie = _getCookie;

      this.$get = [function(){
        return {
          getCookie : _getCookie
        };
      }];

      function _getCookie(cookieName, defaultValue){
        var cookie = (document.cookie.match('(^|; )' + cookieName + '=([^;]*)') || 0)[2];

        if((cookie === null || cookie === '' || typeof cookie === 'undefined') && !!defaultValue){
          cookie = defaultValue;
        }

        return cookie;
      }
    });

})(window.angular);
