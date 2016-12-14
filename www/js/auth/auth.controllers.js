angular.module('PuzzR.auth.controllers', [
    'PuzzR.app.services'
])


.controller('WelcomeCtrl', function($scope, $state, $ionicModal, UserService, $ionicLoading, $ionicActionSheet){
	// $scope.bgs = ["http://lorempixel.com/640/1136"];
	$scope.bgs = ["img/welcome-bg.jpeg"];

    $scope.fbLoginSuccess = function (userData) {
      console.log("UserInfo: ", userData);
    }

$scope.facebookSignIn = function() {
    facebookConnectPlugin.login(["public_profile"], $scope.fbLoginSuccess,
      function loginError (error) {
        console.error(error)
      }
    );
};

  if(UserService.isLoggedIn()==true)
    $state.go('app.shop.home');


	// $scope.facebookSignIn = function(){
	// 	console.log("doing facebbok sign in");
	// 	$state.go('app.shop.home');
	// };

	$ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

    $scope.showPrivacyPolicy = function() {
        $scope.privacy_policy_modal.show();
    };

    $scope.showTerms = function() {
        $scope.terms_of_service_modal.show();
    };

    // GOOGLE
    $scope.googleSignIn = function() {
        $ionicLoading.show({
            template: 'Logging in...'
        });

        window.plugins.googleplus.login(
            {},
            function (user_data) {
                // For the purpose of this example I will store user data on local storage
                console.log(user_data);
                // alert('ID: ' + user_data.userId + ', Name: ' + user_data.displayName + ', mail: ' + user_data.email
                //     + ', idToken: ' + user_data.idToken + ', accessToken: ' + user_data.accessToken);
                UserService.setUser({
                    userId: user_data.userId,
                    name: user_data.displayName,
                    email: user_data.email,
                    picture: user_data.imageUrl,
                    accessToken: user_data.accessToken,
                    idToken: user_data.idToken
                });

                $ionicLoading.hide();
                $state.go('app.shop.home');
            },
            function (msg) {
                $ionicLoading.hide();
            }
        );
    };

    // $scope.showLogOutMenu = function() {
    //     var hideSheet = $ionicActionSheet.show({
    //         destructiveText: 'Logout',
    //         titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
    //         cancelText: 'Cancel',
    //         cancel: function() {},
    //         buttonClicked: function(index) {
    //             return true;
    //         },
    //         destructiveButtonClicked: function(){
    //             $ionicLoading.show({
    //                 template: 'Logging out...'
    //             });
    //             // Google logout
    //             window.plugins.googleplus.logout(
    //                 function (msg) {
    //                     console.log(msg);
    //                     $ionicLoading.hide();
    //                     $state.go('facebook-sign-in');
    //                 },
    //                 function(fail){
    //                     console.log(fail);
    //                 }
    //             );
    //         }
    //     });
    // };
})

.controller('CreateAccountCtrl', function($scope, $state){
	$scope.doSignUp = function(){
		console.log("doing sign up");
		$state.go('app.feed');
	};
})

.controller('WelcomeBackCtrl', function($scope, $state, $ionicModal){
	$scope.doLogIn = function(){
		console.log("doing log in");
		$state.go('app.feed');
	};

	$ionicModal.fromTemplateUrl('views/auth/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.forgot_password_modal = modal;
  });

  $scope.showForgotPassword = function() {
    $scope.forgot_password_modal.show();
  };

	$scope.requestNewPassword = function() {
    console.log("requesting new password");
  };

  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
})

.controller('ForgotPasswordCtrl', function($scope){

})

;
