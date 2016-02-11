// module app {
//     
//     appconfig.$inject = ['$provide'];
//     function appconfig($provide: any) {
//         $provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
//             return function(exception: any, cause:any) {
//                 $delegate(exception, cause);
//                 //alert(exception.message);
//             };
//         }]);
//     }
//     
//     angular.module('app').config(appconfig);
// } 
//# sourceMappingURL=app.config.js.map