angular
    .module('puzzle-details')
    .controller('PuzzleDetailsCtrl', function ($scope, $stateParams, $timeout,  PuzzleService) {
        $scope.id = $stateParams.puzzleId;


        $scope.playPuzzle = function () {
            alert("Puzzle starting...");
        };


        $scope.getData = function() {
            PuzzleService.getPuzzleById({ puzzleId: $scope.id }, function(puzzle) {
                $scope.puzzle = puzzle;
                console.log(puzzle);
            });
        };

        $scope.getData();

    });
