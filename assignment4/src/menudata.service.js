(function () {
  'use strict';

  angular
    .module('data')
    .service('MenuDataService', MenuDataService)
    .constant('API_BASE_PATH', 'https://davids-restaurant.herokuapp.com/');

  MenuDataService.$inject = ['$http', 'API_BASE_PATH'];
  function MenuDataService($http, API_BASE_PATH) {
    var service = this;

    service.getAllCategories = function getAllCategories() {
      return $http({
        url: API_BASE_PATH + 'categories.json',
      }).then(function (result) {
        // result is an array of objects representing categories:
        // {id, short_name, name, special_instructions, url}
        return result;
      });
    };

    service.getItemsForCategory = function getItemsForCategory(
      categoryShortName
    ) {
      return $http({
        url: API_BASE_PATH + 'menu_items.json?category=' + categoryShortName,
      }).then(function (result) {
        // result is an object {menu_items, category} where menu_items is an array of objects:
        // {id, short_name, name, description, price_small, price_large, small_portion_name, large_portion_name}
        return result.menu_items;
      });
    };
  }
})();
