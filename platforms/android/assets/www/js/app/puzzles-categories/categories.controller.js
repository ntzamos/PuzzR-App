angular.module('puzzle.categories', [

])

.controller('CategoriesCtrl', function($scope, PuzzleService) {
    $scope.categories = [];

    $scope.loadCategories = function () {
        console.log('Fetching puzzle categories..');

        PuzzleService.query(function(categories) {
            for(var i=0;i<categories.length;i++) {

              if(categories[i].count == 0 ) continue;
              $scope.categories.push(categories[i]);
            }
            console.log($scope.categories)
        });
    };

    $scope.loadCategories();
});
