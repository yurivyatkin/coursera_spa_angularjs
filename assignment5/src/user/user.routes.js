(function () {
  'use strict';

  angular.module('user').config(routeConfig);

  /**
   * Configures the routes and views
   */
  routeConfig.$inject = ['$stateProvider'];
  function routeConfig($stateProvider) {
    // Routes
    $stateProvider
      .state('user', {
        abstract: true,
        templateUrl: 'src/user/user.html',
      })
      .state('user.signup', {
        url: '/signup',
        templateUrl: 'src/user/sign-up/sign-up.html',
        controller: 'SignUpController',
        controllerAs: 'signUpCtrl',
        resolve: {
          menuItems: [
            'MenuService',
            function (MenuService) {
              return MenuService.getMenuItems();
            },
          ],
        },
      })
      .state('user.myinfo', {
        url: '/myinfo',
        templateUrl: 'src/user/my-info/my-info.html',
        controller: 'MyInfoController',
        controllerAs: 'myInfoCtrl',
      });
  }
})();
