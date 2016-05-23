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

  });
