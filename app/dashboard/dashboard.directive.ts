module app.dashboard {

    function dashboard() {
        return {
            templateUrl: 'app/dashboard/dashboard.html',
            link: function(scope: any, element: JQuery, attrs: ng.IAttributes) {
                scope.addNewWidget = function(widget: any) {
                    //deep copy widget settings to be used in new widget
                    var newWidget = angular.copy(widget.settings);
                    //add new widget to array
                    scope.widgets.push(newWidget);
                };
            }
        };
    }
    
    angular.module('app').directive('dashboard', dashboard);
}