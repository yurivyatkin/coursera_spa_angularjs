(function () {
  'use strict';

  angular.module('MenuApp').component('categoriesList', {
    templateUrl: 'src/categories-list.template.html',
    bindings: {
      categories: '<',
    },
  });
})();
