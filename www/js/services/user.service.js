'use strict';

angular.module('starter').factory('User',
  function($http, $auth, localStorageService, $state) {
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

  User.associateToSections = function(userId, sections){
    return $http.post('/api/users/' + userId + '/associate_to_sections' , {
      sections: sections
    });
  }

  User.getCurrentUserTypeId = function() {
    return User.getCurrentUser().child_id;
  }

  User.get = function(userId) {
    return $http.get('/api/users/' + userId);
  }

  User.currentUserCanDo = function(action) {
    return User.getCurrentUser() && $.inArray(action, User.getCurrentUser().actions) > -1;
  };

  User.all = function(filter,page,range) {
    var params = {page: page, per_page: range };
    angular.extend(params,filter);
    return $http.get('/api/users',{params: params});
  }

  User.list = function(callback) {
    $http.get('/api/users').success(callback);
  };

  User.update = function(user) {
    return $http.put('/api/users/' + user.id, {
      user: user
    });
  };

  User.unapproved = function() {
    return $http.get('/api/users/get_unapproved');
  };

  User.approve = function(id, status) {
    return $http.post('/api/users/approve',{id: id, status: status})
  };

  User.update_student = function(student){
      return $http.put('/api/students/' + student.id,{
        student: student
      });
  };

  User.addNewUser = function(user) {
    return $http.post('/api/users', {
      user: user
    });
  };

  User.submitNewStudent = function(student) {
    return $http.post('/api/users/new_student', {
      student: student
    });
  };

  User.submitNewTeacher = function(teacher) {
    return $http.post('/api/users/new_teacher', {
      teacher: teacher
    });
  };

  User.getStickySysMessages = function(userId) {
    return $http.get('/api/users/'+userId+'/sticky_sys_messages');
  };

  User.newStickySysMessage = function(msg) {
    return $http.post('/api/users/'+userId+'/sticky_sys_messages',{
      sticky_sys_message: msg
    });
  };

  User.logOut = function(){
    User.setCurrentUser(User.guestUser);
    $state.go('sign_in',{}, { 'reload': true });
  }

  User.markSelectedMembers = function(users,selectedUsers){
    if(selectedUsers.length > 0){
      $.each( users, function( i, user ) {
        $.each( selectedUsers, function( i, selected ) {
          if(user.id == selected.id){
            user.isSelected = true;
            return false;
          }
        });
      });
    }
  }

  User.removeSelected = function(users,selectedUsers,removedId){
    $.each( selectedUsers, function( i, user ) {
      if(user.id == removedId){
        selectedUsers.splice(i, 1);
        return false;
      }
    });

    $.each( users, function( i, user ) {
      if(user.id == removedId){
        user.isSelected = false;
        return false;
      }
    });
  }

  User.sliceUserObject = function(pureUser, impureUser){

    angular.copy(impureUser, pureUser);
    pureUser.id =  impureUser.user_id

    // for(var property in impureUser){
    //   if(property != "id")
    //     pureUser[property] = impureUser[property];
    // }
    //
    // for(var property in impureUser.profile){
    //   pureUser[property] = impureUser.profile[property];
    // }

    return pureUser
  }

  User.autocomplete = function(name){
    return $http.get('/api/users/autocomplete?name='+name)
  }

  User.updatePassword = function(user) {
    return $http.put('/api/users/update_password',{
      user: user
    });
  }


  User.getUserTypes = function() {
    return $http.get("resources/user_types.json");
  };

  return User;
});
