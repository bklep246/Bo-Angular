'use strict';

angular.module('app').controller('KendoController', KendoController);

KendoController.$inject = ['$scope', '$log'];
function KendoController($scope, $log) {
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

    vm.selectedSport = null;
    vm.sports = new kendo.data.DataSource({
        data: [{
            id: 1,
            name: 'Basketball'
        }, {
            id: 2,
            name: 'Football'
        }, {
            id: 3,
            name: 'Tennis'
        }]
    });

    angular.element("#grid").kendoGrid({
        dataSource: {
            data: data
        },
        height: 550,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            "id",
            { field: "order", title: "Order" },
            { field: "date", title: "Date", format:"{0:d}" },
            { field: "amount", title:"Amount", format: "{0:c}" },
            { field: "active", title: "Active", width: "130px" }
        ]
    });

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

    vm.onClick1 = function () {
        alert("Primary Button Clicked");
    };

    vm.onClick2 = function () {
        alert("Second Button Clicked");
    };

    vm.acceptedTime = '01:55:45';
}