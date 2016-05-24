'use strict';

angular.module('starter').factory('User',
  function($http, $auth, localStorageService, $state,BASE_URL) {
  var User = {
    guestUser: {
      firstname: 'Guest',
      username: 'Guest',
      user_type: 'guest',
      actions: [
        //Here all guest users actions
        'is guest'
      ]
    }
  }

  User.isGuest = function(){
    var u = User.getCurrentUser();
    return u == null || u.user_type == 'guest';
  }

  User.is = function(type){
    var u = User.getCurrentUser();
    return u.user_type == type;
  }

  User.goToDefaultPage = function(){
    if (User.isGuest()){
      $state.go('sign_in');
      return;
    }
    $state.transitionTo(
      User.getCurrentUser().user_type + ".home"
    );
  }

  User.redirectTo = function (redirectTo) {
    if(redirectTo){
      $state.go(redirectTo);
    }else{
      User.goToDefaultPage();
    }
  }

  User.setCurrentUser = function(user) {
    localStorageService.set('user' , user);
  }

  User.getCurrentUser = function() {
    return localStorageService.get('user');
  };



  User.getCurrentUserTypeId = function() {
    return User.getCurrentUser().child_id;
  }

  User.get = function(userId) {
    return $http.get(BASE_URL+'/users/' + userId);
  }

  User.currentUserCanDo = function(action) {
    return User.getCurrentUser() && $.inArray(action, User.getCurrentUser().actions) > -1;
  };

  User.all = function(filter,page,range) {
    var params = {page: page, per_page: range };
    angular.extend(params,filter);
    return $http.get(BASE_URL + '/users',{params: params});
  }

  User.list = function(callback) {
    $http.get(BASE_URL + '/users').success(callback);
  };

  User.update = function(user) {
    return $http.put(BASE_URL + '/users/' + user.id, {
      user: user
    });
  };



  User.logOut = function(){
    User.setCurrentUser(User.guestUser);
    $state.go('sign_in',{}, { 'reload': true });
  }


  User.updatePassword = function(user) {
    return $http.put(BASE_URL + '/users/update_password',{
      user: user
    });
  }


  User.getUserTypes = function() {
    return $http.get("resources/user_types.json");
  };

  return User;
});
