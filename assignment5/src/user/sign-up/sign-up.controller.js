(function () {
  'use strict';

  angular.module('user').controller('SignUpController', SignUpController);

  SignUpController.$inject = ['menuItems', 'UserService'];
  function SignUpController(menuItems, UserService) {
    var signUpCtrl = this;

    signUpCtrl.isUserSaved = false;
    signUpCtrl.firstName = '';
    signUpCtrl.lastName = '';
    signUpCtrl.emailAddress = '';
    signUpCtrl.phoneNumber = '';
    signUpCtrl.favoriteItem = '';
    signUpCtrl.signUp = function (form) {
      var newUser = {
        firstName: signUpCtrl.firstName,
        lastName: signUpCtrl.lastName,
        emailAddress: signUpCtrl.emailAddress,
        phoneNumber: signUpCtrl.phoneNumber,
        favoriteItem: signUpCtrl.favoriteItem.toUpperCase(),
      };
      if (UserService.setCurrentUser(newUser)) {
        signUpCtrl.isUserSaved = true;
        reset(form);
      }
    };
    signUpCtrl.menuItems = menuItems;
    signUpCtrl.isFavoriteItemValid = function () {
      // menuItems = {menu_items: [{short_name: ..., },...]}
      return !!menuItems.menu_items.find(function (item) {
        return (
          item.short_name.toUpperCase() ===
          signUpCtrl.favoriteItem.toUpperCase()
        );
      });
    };
  }

  function reset(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }
})();
