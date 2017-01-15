angular
    .module('puzzle.play')
    .controller('PuzzlePlayCtrl', PuzzlePlayCtrl);

PuzzlePlayCtrl.$inject = ['$scope', '$stateParams', 'PuzzleService', '$ionicUser', '$ionicPopup', '$ionicLoading'];

function PuzzlePlayCtrl ($scope, $stateParams, PuzzleService, $ionicUser, $ionicPopup, $ionicLoading) {

    var productId = $stateParams.productId;

    console.log('==========================');
    console.log('Puzzle id: ' + productId);
    console.log('==========================');
    PuzzleService.getPuzzleById({puzzleId : productId}, function(product) {
        $scope.product = product;


        console.log(product.post_meta['thumbnail_url']);

        if(product.post_meta['puzzle-ended'].meta_value == "0")
            $('.puzzle-component').puzzle({src:product.post_meta['meta-image1'].meta_value, size:product.post_meta['meta-difficulty'].meta_value, callback: checkWin});

        // checkWin(null, null, 100, 131232);
        function checkWin(rivals, dif, moves, time) {
            console.log(moves + " " + time);

            var userId = $ionicUser.get('puzzrId');
            var info = {
                uid : userId,
                moves: moves,
                time: time
            };

            PuzzleService.postPlay(info ,function(success) {
                console.log(success);
            });
        }
    })
}
