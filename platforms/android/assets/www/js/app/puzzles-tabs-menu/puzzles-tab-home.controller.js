angular.module('puzzles.tab.home', [

])

.controller('ShopCtrl', function($scope, ShopService, PuzzleService) {
    var page = 0;

    $scope.puzzles = [];
    $scope.hasEnded = false;
    $scope.fromRefresh = false;
    $scope.products = [];
    $scope.popular_products = [];

    $scope.loadMore = function() {
        page++;
        console.log('Fetching more puzzles..');
        PuzzleService.getPuzzles({page : page},function(puzzles) {
            console.log('items fetched: ' + puzzles.length);
            console.log(puzzles);

            if (puzzles.length > 0) {
                if($scope.fromRefresh) {
                    $scope.products = puzzles;
                    $scope.fromRefresh = false;
                }
                else {
                    $scope.products = $scope.products.concat(puzzles);
                }
            } else {
                $scope.hasEnded = true;
            }

            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

    $scope.doRefresh = function() {

        page = 0;
        $scope.hasEnded = false;
        $scope.fromRefresh = true;

        $scope.loadMore();
        $scope.$broadcast('scroll.refreshComplete');
    };

});
