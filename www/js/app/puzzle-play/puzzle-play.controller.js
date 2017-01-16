angular
    .module('puzzle.play')
    .controller('PuzzlePlayCtrl', PuzzlePlayCtrl);

PuzzlePlayCtrl.$inject = ['$scope', '$stateParams', 'PuzzleService', '$ionicUser', '$ionicPopup', '$ionicLoading'];

function PuzzlePlayCtrl ($scope, $stateParams, PuzzleService, $ionicUser, $ionicPopup, $ionicLoading) {

    var productId = $stateParams.productId;
    $scope.product = {};
    $scope.puzzleEnded = null;

    console.log('==========================');
    console.log('Puzzle id: ' + productId);
    console.log('==========================');


    $scope.data = [
        {
            username: "nzamy",
            time: "55sec",
            moves: 10
        },
        {
            username: "agg",
            time: "35sec",
            moves: 12
        }
    ]

    function getPuzzle() {
        PuzzleService.getPuzzleById({puzzleId : productId}, function(product) {
            $scope.product = product;

            console.log($scope.product);

            if(product.post_meta['puzzle-ended'].meta_value == "0") {
                $scope.puzzleEnded = false;
                $('.puzzle-component').puzzle({src:product.post_meta['meta-image1'].meta_value, size:product.post_meta['meta-difficulty'].meta_value, callback: checkWin});
            } else {
                $scope.puzzleEnded = true;
            }

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

    getPuzzle();
}
