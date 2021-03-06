﻿module app.dashboard {
    
    widgetBody.$inject = ['$compile'];
    function widgetBody($compile: ng.ICompileService) {
        return {
            templateUrl: 'app/dashboard/widgetBody.html',
            link: function(scope: any, element: any, attrs:any) {
                var newElement = angular.element(scope.item.template);
                element.append(newElement);
                //angular has no knowledge of what goes on in jquery functions so you have to call $compile to updaate the view
                $compile(newElement)(scope);

                scope.close = function() {
                    scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                };

                scope.settings = function() {
                    //var options = {
                    //    templateUrl: scope.item.widgetSettings.templateUrl,
                    //    controller: scope.item.widgetSettings.controller,
                    //    scope: scope
                    //};
                    //$modal.open(options);
                };

                //use empty function so angular handles click event and allows menu to be opened on touch devices
                scope.iconClicked = function() {
                    //empty body
                    //this function is used by ng-click in the template
                    //so that icon clicks aren't intercepted by widgets
                };
            }
        };
    }
    
    angular.module('app').directive('widgetBody', widgetBody);
}