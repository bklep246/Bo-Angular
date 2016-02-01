/**
 * Bento Carousel Card Default Template
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 27/04/2015
 *
 * 27/04/2015
 * - Initial build
 *
 */
(function(){
  'use strict';

  angular.module('bento.carousel')
    .directive('bentoCarouselCardTplDefault', function(){
      return{
        scope: {
          imageUrl: '=',
          text: '='
        },
        template: '<div tabindex="0" class="bento-carousel-card-default">' +
        '<img ng-src="{{imageUrl}}" />' +
        '<span>{{text}}</span>' +
        '</div>',

      }
    })
})();
