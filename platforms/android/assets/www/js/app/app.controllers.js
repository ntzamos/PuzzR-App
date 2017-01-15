angular.module('PuzzR.app.controllers', [
    'PuzzR.app.services'
])


.controller('AppCtrl', function($scope, UserService, $ionicAuth, $ionicUser, $ionicPush) {
    $scope.loggedUser = $ionicUser;


    //Push Notifications
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Token saved:', t.token);
    });
    $scope.$on('$cordovaPush:tokenReceived', function(event, data) {
        console.log("Successfully registered token " + data.token);
        console.log('Ionic Push: Got token ', data.token, data.platform);
        $scope.token = data.token;
    });

    //
    // $scope.$on('cloud:push:notification', function(event, data) {
    //   var msg = data.message;
    //   alert(msg.title + ': ' + msg.text);
    // });
    //
    //

    // var details = {'email': UserService.getUser().email, 'password': 'pass123'};
    //
    //     $ionicAuth.logout();
    // if (!$ionicAuth.isAuthenticated()) {
    //   // $ionicUser is authenticated!
    //   $ionicAuth.login('basic', details).then(function() {
    //     // `$ionicUser` is now registered
    //     console.log("Logged!");
    //   }, function(err) {
    //
    //     $ionicAuth.signup(details).then(function() {
    //       // `$ionicUser` is now registered
    //       console.log("Logged!");
    //     }, function(err) {
    //       for (var e of err.details) {
    //         if (e === 'conflict_email') {
    //           alert('Email already exists.');
    //         } else {
    //           // handle other errors
    //         }
    //       }
    //     });
    //   });
    // }

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
      return true;
  };

  $scope.doRefresh();

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


.controller('CheckoutCtrl', function($scope) {
});
