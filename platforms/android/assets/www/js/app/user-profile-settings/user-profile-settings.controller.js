angular
    .module('user.settings')
    .controller('UserSettingsController', UserSettingsController);

UserSettingsController.$inject = ['$scope', '$state', '$ionicModal', 'UserService', '$ionicLoading'];

function UserSettingsController($scope, $state, $ionicModal, UserService, $ionicLoading) {

    $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.terms_of_service_modal = modal;
    });

    $ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
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
        UserService.logout();
        window.plugins.googleplus.logout();
        facebookConnectPlugin.logout();
        UserService.logout();

        $ionicLoading.hide();
        $state.go('home-page');
    };

}
