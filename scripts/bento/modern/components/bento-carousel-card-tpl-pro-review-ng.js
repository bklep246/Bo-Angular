/**
 * Bento Carousel Card Tax Provision Review Template
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.2
 * @date 18/09/2015
 *
 * 18/09/2015
 * - Using `card-data` to replace variable mappings
 *
 * 27/04/2015
 * - Initial build
 *
 */
(function(){
  'use strict';

  angular.module('bento.carousel')
    .directive('bentoCarouselCardTplProReview', function(){
      return{
        scope: {
          cardData : '=',
          onNewTabClick: '&'
        },
        template:
        '<div class="bento-carousel-card-provision">' +
          '<i class="bento-icon-newtab carousel-newtab-cta" ng-click="newTabClick($event)"></i>' +
          '<h4 class="label" ng-bind="cardData.type"></h4>' +
            '<div class="content">' +
            '<div class="left-col"><i class="icon-a"></i></div>' +
          '<div class="right-col">' +
            '<div class="periods">' +
            '<h3><span ng-bind="cardData.title"></span></h3>' +
          '</div>' +
          '<ul>' +
          '<li ng-repeat="item in cardData.tasks | limitTo: 4" ng-bind="item.title"></li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="foot">' +
            '<div class="time">Yesterday</div>' +
          '</div>' +
        '</div>',
        link: function(scope, element){
          scope.newTabClick =  function($event){
            scope.onNewTabClick({cardData:scope.cardData});
            $event.stopPropagation();
            $event.preventDefault();
          };
        }
      }
    })
})();
