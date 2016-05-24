'use strict';
angular.module('starter')
  .controller('ParentNotificationCtrl', ['$scope', 'PushNotification', 'User',
    function($scope, PushNotification, User) {

      self = this;

      var init = function() {
        $scope.currentNotification = "My Notification";

        initNotifications();

      };



      $scope.$on("dep_user_notification", function(event, notification) {
        $scope.childNotifications.unshift(notification);
        var length = $scope.childNotifications.length;
        if (length > $scope.notifications_limit) {
          $scope.childNotifications.splice($scope.notifications_limit);
        }
      })

      $scope.displayNotifications = function(child) {
        // console.log(child);
        $scope.childNotifications = null;
        if (child != 0) {
          $scope.currentNotification = child.name;
          Parent.getChildNotifications(child.user_id, 1, 3).then(function(response) {
            $scope.notifications = response.data["notifications"];
            Parent.subscribeDepUser($scope, child.user_id);
          });
        } else {
          $scope.currentNotification = "My Notification";
          var user_id = User.getCurrentUser().id;
          PushNotification.all(user_id).success(function(data) {
            // initNotifications();
            $scope.notifications = data["notifications"];
            $scope.unreadNotificationsCount = data["unread_count"];
            PushNotification.subscribe($scope, user_id);
          })
        }
      };

      var initNotifications = function() {
        $scope.notifications_limit = 3;
        $scope.childNotifications = $scope.notifications;
      };
      init();

    }
  ]);
