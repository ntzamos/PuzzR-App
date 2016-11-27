angular
    .module('categories')
    .controller('CategoriesCtrl', function ($scope, PuzzleService) {
        $scope.puzzleCategories = [];

        $scope.getData = function() {
            PuzzleService.query(function(puzzleCategories) {
                $scope.puzzleCategories = puzzleCategories;
                console.log(puzzleCategories);
            });
        };

        $scope.getData();
    });
    