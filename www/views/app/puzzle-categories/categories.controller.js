angular.module('categories', [
  'PuzzR.app.services'
])

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
