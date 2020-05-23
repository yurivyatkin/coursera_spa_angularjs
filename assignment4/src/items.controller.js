(function () {
  'use strict';

  angular.module('MenuApp').controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$stateParams', 'MenuDataService'];
  function ItemsController($stateParams, MenuDataService) {
    var itemsCtrl = this;
    var categoryShortName = $stateParams.categoryShortName;

    if (categoryShortName) {
      var promise = MenuDataService.getItemsForCategory(categoryShortName);
      promise
        .then(function (result) {
          itemsCtrl.items = result.menu_items;
          itemsCtrl.categoryName = result.category.name;
        })
        .catch(function (error) {
          itemsCtrl.items = [];
          itemsCtrl.categoryName = '';
        });
    } else {
      itemsCtrl.items = [];
      itemsCtrl.categoryName = '';
    }
  }
})();
