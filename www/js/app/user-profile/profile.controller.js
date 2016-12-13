angular.module('user.profile', [

])

.controller('ProfileCtrl', function($scope, $stateParams, UserService, $ionicHistory, $state, $ionicScrollDelegate) {

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
  });

  var userId = $stateParams.userId;

  $scope.myProfile = $scope.loggedUser.userId == userId;
  $scope.user = UserService.getUser();


  // $scope.posts = [];
  // $scope.likes = [];
  // $scope.user = {};
  //
  // PostService.getUserPosts(userId).then(function(data){
  //   $scope.posts = data;
  // });
  //
  // PostService.getUserDetails(userId).then(function(data){
  //   $scope.user = data;
  // });
  //
  // PostService.getUserLikes(userId).then(function(data){
  //   $scope.likes = data;
  // });
  //
  // $scope.getUserLikes = function(userId){
  //   //we need to do this in order to prevent the back to change
  //   $ionicHistory.currentView($ionicHistory.backView());
  //   $ionicHistory.nextViewOptions({ disableAnimate: true });
  //
  //   $state.go('app.profile.likes', {userId: userId});
  // };
  //
  // $scope.getUserPosts = function(userId){
  //   //we need to do this in order to prevent the back to change
  //   $ionicHistory.currentView($ionicHistory.backView());
  //   $ionicHistory.nextViewOptions({ disableAnimate: true });
  //
  //   $state.go('app.profile.posts', {userId: userId});
  // };

});
