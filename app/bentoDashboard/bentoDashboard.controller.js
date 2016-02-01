'use strict';

angular.module('app').controller('BentoController', BentoController);

BentoController.$inject = ['$scope', '$log'];
function BentoController($scope, $log) {
    var vm = this;
    // generate some random data
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i,
            order: 100 + i,
            date: new Date(2014, i % 12, i % 28),
            amount: Math.random() * 10000,
            active: i % 4 == 0
        });
    }

    // Dummy Data
    vm.flowers = [
      { id: 1, name: "Rose" },
      { id: 2, name: "Carnation" },
      { id: 3, name: "Lilly" },
      { id: 4, name: "Sunflower" },
      { id: 5, name: "Tulip" },
      { id: 6, name: "Peony" },
      { id: 7, name: "Poinsettia" },
      { id: 8, name: "Orchid" }
    ];

    // Feed Flower Array
    vm.getFlowers = function () {
        return vm.flowers;
    };
    vm.onComboboxChange = function (item) {
        $log.info('changed to', item);
    }

    // add data array to scope
    vm.data = data;

    //DatePicker section
    vm.today = function () {
        vm.dt = new Date(); //  to use with timezones
    };

    vm.today();

    vm.clear = function () {
        vm.dt = null;
    };

    vm.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.opened = !vm.opened;
    };

    vm.dateOptions = {
        'year-format': "'yy'",
        'day-format': "'d'",
        'starting-day': 2,
        'show-weeks': false,
        'show-button-bar': false
    };

    vm.formats = ['MM/dd/yyyy', 'yyyy/MM/dd', 'shortDate'];
    vm.format = vm.formats[0];
}