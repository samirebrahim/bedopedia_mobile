'use strict';
angular.module('starter').controller('UserSessionsCtrl',
  function($scope, $auth, $state, User, localStorageService) {

    var userType = "";
    var init = function() {
      userType = User.getCurrentUser().user_type;
    }

    ///// SIGN OUT /////////
    $scope.logOut = function() {
      // console.log("---inside logOut---");
      $auth.signOut();
      User.setCurrentUser(User.guestUser);
      $scope.current_user = User.getCurrentUser();
      $state.go('sign_in');
      // console.log("---Exit logOut---");
    }

    ///// END SIGN OUT //////


    ///// PASSWORD OPERATIONS //////
    /**REQUEST PASSWORD RESET
    When the user requests for a password reset , an email is sent through rails-api
    */
    $scope.handlePwdResetBtnClick = function() {
      $auth.requestPasswordReset($scope.pwdResetForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

    /**UPDATE THE PASSWORD
    the user submits new password and new password confirmation
    */
    $scope.handleUpdatePasswordBtnClick = function() {
      $auth.updatePassword($scope.updatePasswordForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };
    ////// END PASSWORD OPERATIONS //////

    init();

});
