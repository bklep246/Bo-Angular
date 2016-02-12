
angular.module('services').factory('dataService', DataService);

DataService.$inject = ['$timeout'];
function DataService($timeout) {

    // data used to generate random items
    var countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece']; //, 'France', 'Austria', 'Canada', 'Denmark' ];
    var products = ['Widget', 'Gadget', 'Doohickey'];
    var colors = ['Black', 'White', 'Red', 'Green', 'Blue']; //, 'Yellow', 'Orange', 'Brown'];

    var employees = [
        {
            id: 5000,
            name: 'Andy Chatterton',
            location: 'Raquette River',
            image: 'employee-andy.jpg'
        },
        {
            id: 5001,
            name: 'April Donaldson',
            location: 'Saranac River',
            image: 'employee-april.jpg'
        },
        {
            id: 5002,
            name: 'Don Morgan',
            location: 'Black Creek',
            image: 'employee-andy.jpg'
        },
        {
            id: 5003,
            name: 'Tom Sullivan',
            location: 'Ausable River',
            image: 'employee-andy.jpg'
        },
        {
            id: 5004,
            name: 'Kathy Fletcher',
            location: 'Batten Kill',
            image: 'employee-april.jpg'
        }
    ];

    var getEmployee = function (id) {
        return $timeout(function () {
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id === id) {
                    return employees[i];
                }
            }
            return undefined;
        }, 300);
    };


    return {
        getEmployee: getEmployee,

        // get possible values for each field
        getCountries: function () {
            return countries;
        },
        getProducts: function () {
            return products;
        },
        getColors: function () {
            return colors;
        },
        // get matches for a search term
        getData: function (count, alt) {
            var data = [];
            var dt = new Date();

            // add count items
            for (var i = 0; i < count; i++) {

                // constants used to create data items

                var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                    endDate = new Date(date).setMonth(date.getMonth() + Math.floor(Math.random() * 11)),
                    countryId = Math.floor(Math.random() * countries.length),
                    productId = Math.floor(Math.random() * products.length),
                    colorId = Math.floor(Math.random() * colors.length);


                // create the item
                var item;

                if (alt === 1) {
                    item = {
                        id: i,
                        country: countries[countryId],
                        product: products[productId],
                        volume: Math.random() * 100000 - 5000,
                        discount: Math.random() / 4,
                        active: i % 4 == 0
                    };

                } else if (alt === 2) {
                    item = {
                        id: i,
                        name: products[productId],
                        selected: false,
                        country: countries[countryId],
                        perf: {
                            ytd: Math.random(),
                            m1: Math.random(),
                            m6: Math.random(),
                            m12: Math.random()
                        },
                        alloc: {
                            stock: Math.random(),
                            bond: Math.random(),
                            cash: Math.random(),
                            other: Math.random()
                        }
                    }
                } else if (alt === 3) {
                    item = {
                        selected: false,
                        id: i,
                        start: date,
                        end: endDate,
                        country: countries[countryId],
                        product: {
                            name: products[productId]
                        },
                        color: colors[colorId],
                        amount: Math.round((Math.random() * 10000 - 5000) * 100) / 100,
                        amount2: Math.round((Math.random() * 10000 - 5000) * 100) / 100,
                        discount: Math.round(Math.random() * 1000) / 1000,
                        active: i % 4 == 0
                    };
                } else {
                    item = {
                        selected: false,
                        id: i,
                        start: date,
                        end: endDate,
                        country: countries[countryId],
                        product: products[productId],
                        color: colors[colorId],
                        amount: Math.round((Math.random() * 10000 - 5000) * 100) / 100,
                        amount2: Math.round((Math.random() * 10000 - 5000) * 100) / 100,
                        discount: Math.round(Math.random() * 1000) / 1000,
                        active: i % 4 == 0
                    };

                    for (var j = 0; j < 5; j++) {
                        var col = 'col' + j;
                        item[col] = Math.random() * 100000 - 5000;
                    }
                }

                // add lots of columns to test virtualization
                if (false) {
                    for (var jj = 0; jj < 400; jj++) {
                        item['x' + jj] = jj;
                    }
                }

                // add the item to the list
                data[i] = item;
            }
            return data;
        }
    };
}
    

