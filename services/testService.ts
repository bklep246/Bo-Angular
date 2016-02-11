module services {
    
    function TestService() {    
        // data used to generate random items
        var countries = ['USA', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        var products = ['Widget', 'Gadget', 'Doohickey'];
        var colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
        
        return {
            getCountries: function() {
                return  countries;
            }    
        }
        
    }
    
    angular.module('services').factory('testService', TestService);    
}
