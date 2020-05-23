(function () {
  'use strict';

  angular.module('MenuApp').component('itemsList', {
    templateUrl: 'src/items-list.template.html',
    bindings: {
      items: '<',
    },
  });
})();
