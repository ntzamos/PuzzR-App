angular.module('PuzzR.app.controllers', ['PuzzR.app.services'])


.controller('AppCtrl', function($scope, AuthService) {

  //this will represent our logged user
  var user = {
    about: "Design Lead of Project Fi. Love adventures, green tea, and the color pink.",
    name: "Brynn Evans",
    picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
    _id: 0,
    followers: 345,
    following: 58
  };

  //save our logged user on the localStorage
  AuthService.saveUser(user);
  $scope.loggedUser = user;
})


.controller('ProfileCtrl', function($scope, $stateParams, PostService, $ionicHistory, $state, $ionicScrollDelegate) {

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
  });

  var userId = $stateParams.userId;

  $scope.myProfile = $scope.loggedUser._id == userId;
  $scope.posts = [];
  $scope.likes = [];
  $scope.user = {};

  PostService.getUserPosts(userId).then(function(data){
    $scope.posts = data;
  });

  PostService.getUserDetails(userId).then(function(data){
    $scope.user = data;
  });

  PostService.getUserLikes(userId).then(function(data){
    $scope.likes = data;
  });

  $scope.getUserLikes = function(userId){
    //we need to do this in order to prevent the back to change
    $ionicHistory.currentView($ionicHistory.backView());
    $ionicHistory.nextViewOptions({ disableAnimate: true });

    $state.go('app.profile.likes', {userId: userId});
  };

  $scope.getUserPosts = function(userId){
    //we need to do this in order to prevent the back to change
    $ionicHistory.currentView($ionicHistory.backView());
    $ionicHistory.nextViewOptions({ disableAnimate: true });

    $state.go('app.profile.posts', {userId: userId});
  };

})


.controller('ProductCtrl', function($scope, $stateParams, ShopService, $ionicPopup, $ionicLoading) {
  var productId = $stateParams.productId;

  ShopService.getProduct(productId).then(function(product){
    $scope.product = product;
  });

  // show add to cart popup on button click
  $scope.showAddToCartPopup = function(product) {
    $scope.data = {};
    $scope.data.product = product;
    $scope.data.productOption = 1;
    $scope.data.productQuantity = 1;

    var myPopup = $ionicPopup.show({
      cssClass: 'add-to-cart-popup',
      templateUrl: 'views/app/shop/partials/add-to-cart-popup.html',
      title: 'Add to Cart',
      scope: $scope,
      buttons: [
        { text: '', type: 'close-popup ion-ios-close-outline' },
        {
          text: 'Add to cart',
          onTap: function(e) {
            return $scope.data;
          }
        }
      ]
    });
    myPopup.then(function(res) {
      if(res)
      {
        $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Adding to cart</p>', duration: 1000 });
        ShopService.addProductToCart(res.product);
        console.log('Item added to cart!', res);
      }
      else {
        console.log('Popup closed');
      }
    });
  };
})


.controller('FeedCtrl', function($scope, PostService) {
  $scope.posts = [];
  $scope.page = 0;
  $scope.totalPages = 1;

  $scope.doRefresh = function() {
    PostService.getFeed(1)
    .then(function(data){
      $scope.totalPages = data.totalPages;
      $scope.posts = data.posts;

      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.getNewData = function() {
    //do something to load your new data here
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadMoreData = function(){
      console.log('fortwnw');
    $scope.page += 1;

    PostService.getFeed($scope.page)
    .then(function(data){
      //We will update this value in every request because new posts can be created
      $scope.totalPages = data.totalPages;
      $scope.posts = $scope.posts.concat(data.posts);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function(){
    // return $scope.totalPages > $scope.page;
      return true;
  };

  $scope.doRefresh();

})


.controller('CategoriesPuzzleCtrl', function($scope, $stateParams, ShopService, PuzzleService) {
    var page = 0;
    var catId = $stateParams.categoryId;
    var name = $stateParams.name;

    $scope.name = name;
    $scope.puzzles = [];
    $scope.fromRefresh = false;
    $scope.hasEnded = false;
    $scope.hasData = true;

    console.log('Category Id: ' + catId);
    console.log('Name: ' + name);

    $scope.loadPuzzlesByCat = function() {
        page++;

        console.log('Fetching puzzles By Category..');
        PuzzleService.getPuzzlesByCategory({categoryId: catId, page: page}, function(puzzles) {
            console.log('items fetched: ' + puzzles.length);
            console.log(puzzles);



            if (puzzles.length > 0) {
                if($scope.fromRefresh) {
                    $scope.puzzles = puzzles;
                    $scope.fromRefresh = false;
                }
                else {
                    $scope.puzzles = $scope.puzzles.concat(puzzles);
                }
            } else if (puzzles.length == 0) {
                if (page == 1) {
                    $scope.hasData = false;
                }
                $scope.hasEnded = true;
            }

            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

    $scope.doRefresh = function() {

        page = 0;
        $scope.hasEnded = false;
        $scope.fromRefresh = true;

        $scope.loadPuzzlesByCat();
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('ShopCtrl', function($scope, ShopService, PuzzleService) {
    var page = 0;

    $scope.puzzles = [];
    $scope.hasEnded = false;
    $scope.fromRefresh = false;
    $scope.products = [];
    $scope.popular_products = [];

    $scope.loadMore = function() {
        page++;
        console.log('Fetching more puzzles..');
        PuzzleService.getPuzzles({page : page},function(puzzles) {
            console.log('items fetched: ' + puzzles.length);
            console.log(puzzles);

            if (puzzles.length > 0) {
                if($scope.fromRefresh) {
                    $scope.products = puzzles;
                    $scope.fromRefresh = false;
                }
                else {
                    $scope.products = $scope.products.concat(puzzles);
                }
            } else {
                $scope.hasEnded = true;
            }

            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

    $scope.doRefresh = function() {

        page = 0;
        $scope.hasEnded = false;
        $scope.fromRefresh = true;

        $scope.loadMore();
        $scope.$broadcast('scroll.refreshComplete');
    };

})


.controller('ShoppingCartCtrl', function($scope, ShopService, $ionicActionSheet, _) {
  $scope.products = ShopService.getCartProducts();

  $scope.removeProductFromCart = function(product) {
    $ionicActionSheet.show({
      destructiveText: 'Remove from cart',
      cancelText: 'Cancel',
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        ShopService.removeProductFromCart(product);
        $scope.products = ShopService.getCartProducts();
        return true;
      }
    });
  };

  $scope.getSubtotal = function() {
    return _.reduce($scope.products, function(memo, product){ return memo + product.price; }, 0);
  };

})

.controller('CategoriesCtrl', function($scope, PuzzleService) {
    $scope.categories = [];

    $scope.loadCategories = function () {
        console.log('Fetching puzzle categories..');

        PuzzleService.query(function(categories) {
            $scope.categories = categories;
            console.log(categories)
        });
    };

    $scope.loadCategories();
})



.controller('CheckoutCtrl', function($scope) {
  //$scope.paymentDetails;
})

.controller('SettingsCtrl', function($scope, $ionicModal) {

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

})



;
