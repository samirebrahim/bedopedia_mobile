'use strict';

angular.module('starter').controller('MainCtrl',
  function($scope, User,$auth,$state,PushNotification) {
    var self = this;

    self.init = function() {
      if (!User.isGuest()) {
        $scope.current_user = User.getCurrentUser();
        if (!User.isGuest()) $scope.notificationSubscribe();

        // getStickySystemMessages();
        // initBranch(User.getCurrentUser().branch_id);

        // initBedoDragonMessage();
      } else {
        User.setCurrentUser(User.guestUser);
      }
    }
    $scope.notificationSubscribe = function() {
    var user_id = User.getCurrentUser().id;
    $scope.main_notifications_limit = 6;
    PushNotification.all(user_id).success(function(data) {
      // initNotifications();
      $scope.notifications = data["notifications"];
      $scope.unreadNotificationsCount = data["unread_count"];
      PushNotification.subscribe($scope, user_id);
    })
  };

  $scope.$on("notifications_fetched", function(event, notification) {


    // initNotifications();
    $scope.notifications.unshift(notification);
    var length = $scope.notifications.length;
    if (length > $scope.main_notifications_limit) {
      $scope.notifications.splice(length - 1);
    }
    $scope.unreadNotificationsCount++;
  });

  $scope.goToNotificationState = function(notification) {
    PushNotification.redirectToDestination(notification);
  }
    ///// SIGN OUT /////////
    $scope.logOut = function() {
      // console.log("---inside logOut---");
      console.log("Entered");
      $auth.signOut();
      User.setCurrentUser(User.guestUser);
      $scope.current_user = User.getCurrentUser();
      $state.go('sign_in');
      // console.log("---Exit logOut---");
    }

    ///// END SIGN OUT //////


        $scope.$on('auth:login-success', function(ev, user) {
            // console.log("---- login-success ----");
            $scope.error = '';
            User.get(user.id).success(function(response) {
              User.setCurrentUser(response);
              self.init();
               User.goToDefaultPage();
            });
            // console.log("---- Exit login-success ----");
          });
          $scope.$on('auth:logout-success', function() {
              User.logOut();
            });

  });
