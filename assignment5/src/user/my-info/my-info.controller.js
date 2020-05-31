(function () {
  'use strict';

  angular.module('user').controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserService', 'MenuService'];
  function MyInfoController(UserService, MenuService) {
    var myInfoCtrl = this;
    var currentUser = UserService.getCurrentUser();
    myInfoCtrl.currentUser = currentUser;
    myInfoCtrl.menuItem = null;
    if (currentUser && currentUser.favoriteItem) {
      var promise = MenuService.getMenuItem(currentUser.favoriteItem);
      promise.then(function (response) {
        myInfoCtrl.menuItem = response.data;
      });
      promise.catch(function (error) {
        myInfoCtrl.menuItem = null;
      });
    }
  }
})();
