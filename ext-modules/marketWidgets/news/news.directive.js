'use strict';

angular.module('marketWidgets').directive('news', News);

News.$inject = ['dataService'];
function News(dataService) {
    return {
        templateUrl: 'ext-modules/marketWidgets/news/news.html',
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}