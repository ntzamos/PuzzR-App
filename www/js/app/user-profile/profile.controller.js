angular.module('user.profile')

.controller('ProfileCtrl', function($scope, $stateParams, UserService, $ionicUser, $ionicHistory, $state, $ionicScrollDelegate) {

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
  });

  var userId = $stateParams.userId;


  $scope.myProfile = $ionicUser.get('puzzrId') == userId;
  $scope.user = $ionicUser;


});
