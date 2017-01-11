angular
    .module('home-page')
    .controller('HomePageController', HomePageController);

HomePageController.$inject = ['$scope', '$state', '$ionicModal', 'UserService', '$ionicLoading', '$ionicActionSheet'];

function HomePageController($scope, $state, $ionicModal, UserService, $ionicLoading, $ionicActionSheet) {
    $scope.bgs = ["img/welcome-bg.jpeg"];

    if(UserService.isLoggedIn() == 'true'){
        $state.go('app.shop.home');
    }

    $scope.fbLoginSuccess = function (userData) {
        facebookConnectPlugin.api('/me?fields=name,email,picture.type(large)', null,
            function(user_data) {

                console.log("UserInfo: ", user_data);
                UserService.login();

                console.log("Isloggedin= " + UserService.isLoggedIn());

                UserService.setUser({
                    userId: user_data.userId,
                    name: user_data.name,
                    email: user_data.email,
                    picture: user_data.picture.data.url,
                    accessToken: user_data.accessToken,
                    idToken: user_data.idToken
                });

                $state.go('app.shop.home');
            });
    };

    $scope.facebookSignIn = function() {
        facebookConnectPlugin.login(["public_profile"], $scope.fbLoginSuccess,
            function loginError (error) {
                console.error(error)
            }
        );
    };

    $ionicModal.fromTemplateUrl('js/app/user-profile-settings/legal/privacy-policy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.privacy_policy_modal = modal;
    });

    $ionicModal.fromTemplateUrl('js/app/user-profile-settings/legal/terms-of-service.html', {
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
}