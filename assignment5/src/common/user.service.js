(function () {
  'use strict';

  angular.module('common').service('UserService', UserService);

  var currentUser = null;

  function UserService() {
    var service = this;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
      return currentUser;
    };
  }
})();
