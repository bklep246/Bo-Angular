module extModules.account {
    
    Activity.$inject = ['dataService'];
    function Activity(dataService: any) {
        return {
            templateUrl: function (tElement: any, tAttrs: any) {
                return tAttrs.templateUrl;
            },
            link: function (scope: any, el: JQuery, attrs:ng.IAttributes) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                    .then(function (data:any) {
                        scope.selectedEmployee = data;
                    });
            }
        };
    }
    
    angular.module('accountWidgets').directive('activity', Activity);
}