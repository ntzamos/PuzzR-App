angular.module('PuzzR',[
    'ionic',
    'user.profile',
    'puzzle.play',
    'puzzle.categories',
    'puzzles.categorized',
    'puzzles.tab.hot',
    'puzzles.tab.home',
    'puzzles.tab.all',
    'PuzzR.common.directives',
    'PuzzR.app.controllers',
    'PuzzR.auth.controllers',
    'PuzzR.app.services',
    // 'PuzzR.views',
    'underscore',
    'angularMoment',
    'ngIOS9UIWebViewPatch'
])
// Enable native scrolls for Android platform only,
// as you see, we're disabling jsScrolling to achieve this.
.config(function ($ionicConfigProvider) {
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
  }
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

  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "views/app/feed.html",
        controller: "FeedCtrl"
      }
    }
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
        templateUrl: "js/app/user-profile/settings.html",
        controller: 'SettingsCtrl'
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
        controller: 'ShopCtrl'
      }
    }
  })

  .state('app.shop.popular', {
    url: "/popular",
    views: {
      'shop-popular': {
        templateUrl: "js/app/puzzles-tab-all/puzzles-tab-all.template.html",
        controller: 'ShopCtrl'
      }
    }
  })

  .state('app.shop.sale', {
    url: "/sale",
    views: {
      'shop-sale': {
        templateUrl: "js/app/puzzles-tab-hot/puzzles-tab-hot.template.html",
        controller: 'ShopCtrl'
      }
    }
  })

  .state('app.cart', {
    url: "/cart",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/cart.html",
        controller: 'ShoppingCartCtrl'
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

  .state('app.shipping-address', {
    url: "/shipping-address",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/shipping-address.html",
        controller: "CheckoutCtrl"
      }
    }
  })

  .state('app.checkout', {
    url: "/checkout",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/checkout.html",
        controller: "CheckoutCtrl"
      }
    }
  })

  .state('app.product-detail', {
    url: "/product/:productId",
    views: {
      'menuContent': {
        templateUrl: "js/app/puzzle-play/puzzle-play.template.html",
        controller: 'ProductCtrl'
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

  //AUTH ROUTES
  .state('facebook-sign-in', {
    url: "/facebook-sign-in",
    templateUrl: "views/auth/facebook-sign-in.html",
    controller: 'WelcomeCtrl'
  })

  .state('dont-have-facebook', {
    url: "/dont-have-facebook",
    templateUrl: "views/auth/dont-have-facebook.html",
    controller: 'WelcomeCtrl'
  })

  .state('create-account', {
    url: "/create-account",
    templateUrl: "views/auth/create-account.html",
    controller: 'CreateAccountCtrl'
  })

  .state('welcome-back', {
    url: "/welcome-back",
    templateUrl: "views/auth/welcome-back.html",
    controller: 'WelcomeBackCtrl'
  })
;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/facebook-sign-in');
  // $urlRouterProvider.otherwise('/app/feed');
});
