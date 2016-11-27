angular
    .module('puzzle-details')
    .controller('PuzzleDetailsCtrl', function ($scope, $stateParams, $timeout,  PuzzleService) {
        $scope.id = $stateParams.puzzleId;

        if ($scope.id % 2 == 0) {
            $scope.puzzle = {src: "http://i52.tinypic.com/157yxeh.jpg"}
        } else {
            $scope.puzzle = {src: "https://cdn.pastemagazine.com/www/articles/league%20of%20legends%20isp%20news%20square.jpg"}
        }

        $scope.playPuzzle = function () {
            alert("Puzzle starting...");
        }

    });