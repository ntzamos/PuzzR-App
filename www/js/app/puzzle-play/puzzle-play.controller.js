angular.module('puzzle.play', [

])

.controller('ProductCtrl', function($scope, $stateParams, ShopService, PuzzleService, UserService, $ionicPopup, $ionicLoading) {

  var productId = $stateParams.productId;

  ShopService.getProduct(productId).then(function(product){
    $scope.product = product;

    console.log(product.post_meta['thumbnail_url']);
    //imagePuzzle.startGame(product.post_meta['meta-image1'].meta_value, product.post_meta['meta-difficulty'].meta_value);


    if(product.post_meta['puzzle-ended'].meta_value == "0")
    $('.puzzle-component').puzzle({src:product.post_meta['meta-image1'].meta_value, size:product.post_meta['meta-difficulty'].meta_value, callback: checkWin});

    checkWin(null, null, 100, 131232);
    function checkWin(rivals, dif, moves, time) {
      console.log(moves + " " + time);

      var user = UserService.getUser();
      var info = {
        // uid : user.userId,
        uid : 1,
        moves: moves,
        time: time
      };

      PuzzleService.postPlay(info ,function(success) {
          console.log(success);
      });


    }


  });

});
