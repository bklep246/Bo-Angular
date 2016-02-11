module extModules.trading {
    
    Equity.$inject = ['dataService'];
    function Equity(dataService:any) {
        return {
            templateUrl: function(tElement:JQuery, tAttrs:any) {
                return tAttrs.templateUrl;
            },
            link: function(scope: any, el: JQuery, attrs: ng.IAttributes) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                    .then(function(data:any) {
                        scope.selectedEmployee = data;
                    });

                scope.symbol = 'test';
                scope.action = 'buy';
            }
        };
    }
    angular.module('tradingWidgets').directive('equity', Equity);
}