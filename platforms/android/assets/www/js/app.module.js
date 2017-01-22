angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('PuzzR', [
    'ionic',
    'home-page',
    'user.profile',
    'user.settings',
    'puzzle.play',
    'puzzle.categories',
    'puzzles.categorized',
    'puzzles.tab.ended',
    'puzzles.tab.home',
    'puzzles.tab.all',
    'PuzzR.common.directives',
    'PuzzR.app.controllers',
    'core',
    'PuzzR.app.services',
    'underscore',
    'angularMoment',
    'ngIOS9UIWebViewPatch',
    'ionic.cloud'
])


.run(function($ionicPlatform, $rootScope, $ionicHistory, $ionicPopup) {
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {ionic.Platform.exitApp();
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });
    });
});
