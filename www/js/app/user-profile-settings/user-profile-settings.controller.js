angular
    .module('user.settings')
    .controller('UserSettingsController', UserSettingsController);

UserSettingsController.$inject = ['$scope', '$state', '$ionicModal', '$ionicFacebookAuth', '$ionicLoading'];

function UserSettingsController($scope, $state, $ionicModal, $ionicFacebookAuth, $ionicLoading) {

    $ionicModal.fromTemplateUrl('js/app/user-profile-settings/legal/terms-of-service.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.terms_of_service_modal = modal;
    });

    $ionicModal.fromTemplateUrl('js/app/user-profile-settings/legal/privacy-policy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.privacy_policy_modal = modal;
    });

    $scope.showTerms = function() {
        $scope.terms_of_service_modal.show();
    };

    $scope.showPrivacyPolicy = function() {
        $scope.privacy_policy_modal.show();
    };

    $scope.logout = function() {
        $ionicLoading.show();
        $ionicFacebookAuth.logout();
        $ionicLoading.hide();
        $state.go('home-page');
    };

}
