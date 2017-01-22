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
    'PuzzR.app.services',
    'underscore',
    'angularMoment',
    'ngIOS9UIWebViewPatch',
    'ionic.cloud'
])
// Enable native scrolls for Android platform only,
// as you see, we're disabling jsScrolling to achieve this.
.config(function ($ionicConfigProvider) {
    if (ionic.Platform.isAndroid()) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
    }
})
.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "4ef8cc53"
    },
    "auth": {
      "facebook": {
        "scope": ["email", "public_profile"]
      }
    },
    "push": {
      "sender_id": "305777829642",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    //SIDE MENU ROUTES
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "js/app/side-menu/side-menu.template.html",
        controller: 'AppCtrl'
    })
    .state('app.profile', {
        abstract: true,
        url: '/profile/:userId',
        views: {
            'menuContent': {
                templateUrl: "js/app/user-profile/profile.template.html",
                controller: 'ProfileCtrl'
            }
        }
    })
    .state('app.profile.posts', {
        url: '/posts',
        views: {
            'profileContent': {
                templateUrl: 'js/app/user-profile/useless/profile.posts.html'
            }
        }
    })
    .state('app.profile.likes', {
        url: '/likes',
        views: {
            'profileContent': {
                templateUrl: 'js/app/user-profile/useless/profile.likes.html'
            }
        }
    })
    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "js/app/user-profile-settings/user-profile-settings.template.html",
                controller: 'UserSettingsController'
            }
        }
    })
    .state('app.shop', {
        url: "/puzzles-menu",
        abstract: true,
        views: {
            'menuContent': {
                templateUrl: "js/app/puzzles-tabs-menu/puzzles-tabs-menu.template.html"
            }
        }
    })
    .state('app.shop.home', {
        url: "/",
        views: {
            'shop-home': {
                templateUrl: "js/app/puzzles-tab-home/puzzles-tab-home.template.html",
                controller: 'PuzzlesMenuController'
            }
        }
    })
    .state('app.shop.popular', {
        url: "/popular",
        views: {
            'shop-popular': {
                templateUrl: "js/app/puzzles-tab-all/puzzles-tab-all.template.html",
                controller: 'PuzzlesMenuController'
            }
        }
    })
    .state('app.shop.sale', {
        url: "/sale",
        views: {
            'shop-sale': {
                templateUrl: "js/app/puzzles-tab-ended/puzzles-tab-ended.template.html",
                controller: 'PuzzlesMenuController'
            }
        }
    })
    .state('app.categories', {
        url: "/categories",
        views: {
            'menuContent': {
                templateUrl: "js/app/puzzles-categories/categories.template.html",
                controller: 'CategoriesCtrl'
            }
        }
    })
    .state('app.product-detail', {
        cache: false,
        url: "/product/:productId",
        views: {
            'menuContent': {
                templateUrl: "js/app/puzzle-play/puzzle-play.template.html",
                controller: 'PuzzlePlayCtrl'
            }
        }
    })
    .state('app.categories-puzzle', {
        url: "/categories/:categoryId",
        params: {name: null},
        views: {
            'menuContent': {
                templateUrl: "js/app/categorized-puzzles-list/categorized-puzzles-list.template.html",
                controller: 'CategoriesPuzzleCtrl'
            }
        }
    })
    .state('home-page', {
        url: "/home-page",
        templateUrl: "js/app/home-page/home-page.template.html",
        controller: 'HomePageController'
    });


    $urlRouterProvider.otherwise('/home-page');
});
