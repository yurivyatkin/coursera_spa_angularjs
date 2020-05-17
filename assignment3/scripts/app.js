(function () {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.found = [];
    ctrl.narrowItDown = function (searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise
        .then(function (result) {
          ctrl.found = result;
        })
        .catch(function (error) {
          console.log('An error occurred:', error);
        });
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: ApiBasePath + 'menu_items.json',
      }).then(function (result) {
        // process result and only keep items that match
        var menu_items = result.data.menu_items;
        var foundItems = menu_items.filter(hasSearchTermInDescription);
        // return processed items
        return foundItems;
      });

      function hasSearchTermInDescription(item) {
        return item.description.includes(searchTerm);
      }
    };
  }
})();
