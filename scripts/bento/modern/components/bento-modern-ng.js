/**
 * Bento Modern NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.3
 * @date 05/25/2014
 *
 * Debug mode is disabled
 */

(function(angular){
  //Register Bento Modern
  angular.module('bento.modern',[
    'bento.services',
    'bento.busyloader',
    'bento.combobox',
    'bento.cookie',
    'bento.datatable',
    'bento.off.canvas.menu',
    'bento.pagination',
    'bento.reset',
    'bento.select',
    'bento.splittergroup',
    'bento.toggle',
    'bento.toolbar',
    'bento.tree',
    'bento.wizard',
    'ui-modern'
  ]).config(['$logProvider', function($logProvider){
    $logProvider.debugEnabled(false);
  }]);
})(window.angular);
