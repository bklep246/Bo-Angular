'use strict';

angular.module('marketWidgets').directive('news', News);

News.$inject = ['dataService'];
function News(dataService) {
    return {
        templateUrl: function (tElement, tAttrs) {
            return tAttrs.templateUrl;
        },
        link: function (scope, el, attrs) {
            dataService.getEmployee(scope.item.widgetSettings.id)
            .then(function (data) {
                scope.selectedEmployee = data;
            });
        }
    };
}