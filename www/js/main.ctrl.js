'use strict';

angular.module('starter').controller('MainCtrl',
  function($scope, User) {
    var self = this;

    self.init = function() {
      if (!User.isGuest()) {
        $scope.current_user = User.getCurrentUser();
        // getStickySystemMessages();
        // initBranch(User.getCurrentUser().branch_id);

        // initBedoDragonMessage();
      } else {
        User.setCurrentUser(User.guestUser);
      }
    }


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
