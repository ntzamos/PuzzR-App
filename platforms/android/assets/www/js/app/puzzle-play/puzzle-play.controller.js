angular.module('puzzle.play', [
    
])

.controller('ProductCtrl', function($scope, $stateParams, ShopService, $ionicPopup, $ionicLoading) {

  var productId = $stateParams.productId;

  ShopService.getProduct(productId).then(function(product){
    $scope.product = product;

    console.log(product.post_meta['thumbnail_url']);
    //imagePuzzle.startGame(product.post_meta['meta-image1'].meta_value, product.post_meta['meta-difficulty'].meta_value);


    $('.puzzle-component').puzzle({src:product.post_meta['meta-image1'].meta_value, size:product.post_meta['meta-difficulty'].meta_value, callback: checkWin});

    function checkWin(rivals, dif, moves, time) {
      console.log(moves + " " + time);

    }


  });

});
