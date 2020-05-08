(function () {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.checkOff = ShoppingListCheckOffService.checkOff;
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var initialItems = [
      { name: 'cookies', quantity: 10 },
      { name: 'sausages', quantity: 10 },
      { name: 'eggs', quantity: 10 },
    ];
    var toBuyItems = initialItems;
    var boughtItems = [];
    service.getToBuyItems = function () {
      return toBuyItems;
    };
    service.getBoughtItems = function () {
      return boughtItems;
    };
    service.checkOff = function (idx) {
      var checkOffItem = toBuyItems.splice(idx, 1)[0];
      boughtItems.push(checkOffItem);
    };
  }
})();
