angular
    .module('puzzles-list')
    .controller('PuzzlesCtrl', function ($scope, $stateParams, $timeout,  PuzzleService) {

        var page = 0;

        $scope.puzzles = [];
        $scope.hasEnded = false;
        $scope.fromRefresh = false;


        $scope.loadMore = function() {

            page++;

            PuzzleService.getPuzzles({page : page},function(puzzles) {
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
