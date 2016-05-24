'use strict';
angular.module('starter')
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/not_found');

    $urlRouterProvider.when("", "/").when("/", ['$state', 'User',
      function($state, User) {
        User.goToDefaultPage();
      }
    ]);

    $stateProvider
      .state('sign_in', {
        url: '/sign_in',
        templateUrl: 'templates/sign_in.html',
        controller: 'UserSessionsCtrl',
        resolve: {
          load: [
            '$q',
            'User',
            function($q, User) {
              var defer = $q.defer();
              if (User.isGuest()) {
                defer.resolve();
              } else {
                defer.reject("already_logged_in");
              }
              return defer.promise;
            }
          ]
        }
      })
      .state('parent', {
      url: '/parent',
      templateUrl: 'templates/layout/parent_page_template.html',
      controller: 'ParentNotificationCtrl',
       data: {
        roles: {
          any: ["parent"]
        }
      }
    })
      .state('parent.home', {
    url: '/home',
    templateUrl: 'templates/Notification/home.html'
   })

  }
]);
