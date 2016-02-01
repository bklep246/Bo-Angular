/**
 * Bento Carousel Card Lonestar Default Template
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @author Joe Huang <joe.huang@thomsonreuters.com>
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
    .directive('bentoCarouselCardTplLsDefault', function(){
      return{
        scope: {
          label: '=',
          mainTitle: '=',
          subTitle: '=',
          content: '=',
          lastEdited: '=',
          dueDate: '='
        },
        templateUrl: '../templates/carousel/cards/bento-carousel-card-ls-default.html',
      }
    })
})();
