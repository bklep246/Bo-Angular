'use strict';

angular.module('app').controller('BentoController', BentoController);

BentoController.$inject = ['$scope', '$log', '$timeout', 'flexGridSetUpService', '$locale', 'dataService'];
function BentoController($scope, $log, $timeout, flexGridSetUpService, $locale, dataService) {
    var vm = this;

    vm.message = 'Status';

    vm.cboTextChanged = function (sender, args) {
        //debugger;
    };

    vm.testButtonClicked = function () {
        var val = $scope.cboTest.text;
        alert(val);
        //debugger;
    };

    // generate some random data
    var data = [];
    for (var i = 0; i < 500; i++) {
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
    
    // create some random data
    //var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
    //    wData = [];
    //for (var i = 0; i < countries.length; i++) {
    //    wData.push({
    //        country: countries[i],
    //        downloads: Math.round(Math.random() * 20000),
    //        sales: Math.random() * 10000,
    //        expenses: Math.random() * 5000
    //    });
    //}

    //// expose data as a CollectionView to get events
    //$scope.wData = new wijmo.collections.CollectionView(wData);

}