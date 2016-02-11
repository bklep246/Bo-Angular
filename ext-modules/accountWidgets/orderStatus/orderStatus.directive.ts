module extModules.account {

    OrderStatus.$inject = ['dataService'];
    function OrderStatus(dataService: any) {
        return {
            templateUrl: function(tElement: JQuery, tAttrs: any) {
                return tAttrs.templateUrl;
            },
            link: function(scope: any, el:JQuery, attrs: ng.IAttributes) {
                dataService.getEmployee(scope.item.widgetSettings.id)
                    .then(function(data:any) {
                        scope.selectedEmployee = data;
                    });
            }
        };
    }
    angular.module('accountWidgets').directive('orderStatus', OrderStatus);
}