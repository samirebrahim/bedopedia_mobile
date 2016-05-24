angular.module('starter').factory('PushNotification',[
  '$http',
  '$state',
  'User',
  function($http,$state,User){

  var depUserSource;
  var PushNotification = {};

  PushNotification.all = function (user_id, page, range) {
    if(!user_id) return;
    var params = {page: page, per_page: range};
    return $http.get('/api/users/' + user_id + '/notifications', {
      params: params
    });
  }
  PushNotification.redirectToDestination = function(notification){
    var params = notification.destination_objects;
    var destination = notification.destination;
    if(destination == "VirtualClassroom"){
      $state.go('student.course_group.virtual_classroom' , {courseId: params.course_id , courseGroupId: params.course_group_id});
    }

  };
  PushNotification.subscribeDepUser = function(scope,user_id) {
    // if(!user_id) return;
    // if(depUserSource) depUserSource.close();
    // depUserSource = new EventSource('/api/live_notifications?user_id='+user_id);
    // depUserSource.addEventListener("notifications_fetched", function(event) {
    //   if(event.data != "heartbeat"){
    //     var res = JSON.parse(event.data);
    //     scope.$broadcast('dep_user_notification',res);
    //   }
    // });
    // var handler = $rootScope.$on('notifications_fetched', callback);
    // scope.$on('$destroy', handler);
  }

  PushNotification.subscribe = function(scope) {
    // var user_id = User.getCurrentUser().id;
    // var source = new EventSource('/api/live_notifications?user_id='+user_id);
    // source.addEventListener("notifications_fetched", function(event) {
    //   if(event.data != "heartbeat"){
    //     var res = JSON.parse(event.data);
    //     scope.$broadcast('notifications_fetched',res);
    //   }
    // });
    // var handler = $rootScope.$on('notifications_fetched', callback);
    // scope.$on('$destroy', handler);
  }

  // PushNotification.notify = function(notification) {
  //   $rootScope.$emit('notifications_fetched',notification);
  // }

  return PushNotification;
}])
