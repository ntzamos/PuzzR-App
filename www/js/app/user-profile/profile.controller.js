angular.module('user.profile')

.controller('ProfileCtrl', function($scope, $stateParams, UserService, $ionicHistory, $state, $ionicScrollDelegate) {

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
  });

  var userId = $stateParams.userId;

  $scope.myProfile = $scope.loggedUser.userId == userId;
  $scope.user = UserService.getUser();


});
