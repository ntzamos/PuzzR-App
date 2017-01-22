angular
    .module('puzzles.tab.home')
    .controller('PuzzlesMenuController', PuzzlesMenuController)
    .filter('htmlToPlaintext', function() {
        return function(text) {
          return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
      }
    );
PuzzlesMenuController.$inject = ['$scope', 'PuzzleService'];

function PuzzlesMenuController($scope, PuzzleService) {
    var page = 0;
    var pageEnded = 0;

    $scope.puzzles = [];
    $scope.hasEnded = false;
    $scope.fromRefresh = false;
    $scope.products = [];
    $scope.ended_products = [];
    $scope.popular_products = [];

    $scope.loadMoreEnded = function() {
        pageEnded++;
        console.log('Fetching more puzzles..');
        PuzzleService.getPuzzlesEnded({page : pageEnded},function(puzzles) {
            console.log('items fetched: ' + puzzles.length);
            console.log(puzzles);

            if (puzzles.length > 0) {
                if($scope.fromRefresh) {
                    $scope.ended_products = puzzles;
                    $scope.fromRefresh = false;
                }
                else {
                    $scope.ended_products = $scope.ended_products.concat(puzzles);
                }
            } else {
                $scope.hasEnded = true;
            }

            $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };
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

    $scope.doRefreshEnded = function() {

        pageEnded = 0;
        $scope.hasEnded = false;
        $scope.fromRefresh = true;

        $scope.loadMoreEnded();
        $scope.$broadcast('scroll.refreshComplete');
    };

};
