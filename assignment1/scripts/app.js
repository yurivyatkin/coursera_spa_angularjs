(function () {
  'use strict';

  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunch = '';
    $scope.message = '';
    $scope.message_class = '';
    $scope.border_class = '';
    $scope.check = function () {
      var items = $scope.lunch
        .split(',')
        .map((item) => item.trim())
        .filter((item) => !!item);
      var items_count = items.length;
      console.log('items', items);
      if (items_count < 1) {
        $scope.message = 'Please enter data first';
        $scope.message_class = 'text-danger';
        $scope.border_class = 'border border-danger';
        return;
      }
      if (items_count > 3) {
        $scope.message = 'Too much!';
        $scope.message_class = 'text-success';
        $scope.border_class = 'border border-success';
        return;
      }
      $scope.message = 'Enjoy!';
      $scope.message_class = 'text-success';
      $scope.border_class = 'border border-success';
    };
  }
})();
