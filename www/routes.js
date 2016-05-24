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
          templateUrl: 'templates/layout/actor_page_template.html',
          controller: 'ActorNotificationCtrl',
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

      .state('teacher', {
          url: '/teacher',
          templateUrl: 'templates/layout/actor_page_template.html',
          controller: 'ActorNotificationCtrl',
          data: {
            roles: {
              any: ["teacher"]
            }
          }
        })
        .state('teacher.home', {
          url: '/home',
          templateUrl: 'templates/Notification/home.html'
        })
        .state('student', {
          url: '/student',
          templateUrl: 'templates/layout/actor_page_template.html',
          controller: 'ActorNotificationCtrl',
          data: {
            roles: {
              any: ["student"]
            }
          }
        })
        .state('student.home', {
          url: '/home',
          templateUrl: 'templates/Notification/home.html'
        })
        .state('hod', {
          url: '/hod',
          templateUrl: 'templates/layout/actor_page_template.html',
          controller: 'ActorNotificationCtrl',
          data: {
            roles: {
              any: ["hod"]
            }
          }
        })
        .state('hod.home', {
          url: '/home',
          templateUrl: 'templates/Notification/home.html'
        })
        .state('admin', {
          url: '/admin',
          templateUrl: 'templates/layout/actor_page_template.html',
          controller: 'ActorNotificationCtrl',
          data: {
            roles: {
              any: ["admin"]
            }
          }
        })
        .state('admin.home', {
          url: '/home',
          templateUrl: 'templates/Notification/home.html'
        })

    }
  ]);
