angular.module('puzzles.categorized', [

])

.controller('CategoriesPuzzleCtrl', function($scope, $stateParams, ShopService, PuzzleService) {
    var page = 0;
    var catId = $stateParams.categoryId;
    var name = $stateParams.name;

    $scope.name = name;
    $scope.puzzles = [];
    $scope.fromRefresh = false;
    $scope.hasEnded = false;
    $scope.hasData = true;

    console.log('Category Id: ' + catId);
    console.log('Name: ' + name);

    $scope.loadPuzzlesByCat = function() {
        page++;

        console.log('Fetching puzzles By Category..');
        PuzzleService.getPuzzlesByCategory({categoryId: catId, page: page}, function(puzzles) {
            console.log('items fetched: ' + puzzles.length);
            console.log(puzzles);

            if (puzzles.length > 0) {
                if($scope.fromRefresh) {
                    $scope.puzzles = puzzles;
                    $scope.fromRefresh = false;
                }
                else {
                    $scope.puzzles = $scope.puzzles.concat(puzzles);
                }
            } else if (puzzles.length == 0) {
                if (page == 1) {
                    $scope.hasData = false;
                }
                $scope.hasEnded = true;
            }

            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

    $scope.doRefresh = function() {

        page = 0;
        $scope.hasEnded = false;
        $scope.fromRefresh = true;

        $scope.loadPuzzlesByCat();
        $scope.$broadcast('scroll.refreshComplete');
    };
});
