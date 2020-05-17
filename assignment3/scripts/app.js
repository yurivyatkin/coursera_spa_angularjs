(function () {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/')
    .directive('foundItems', FoundItemsDirective);

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
    ctrl.remove = function (idx) {
      ctrl.found.splice(idx, 1);
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

  function FoundItemsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        found: '<foundItems',
        remove: '<onRemove',
      },
    };
  }
})();
