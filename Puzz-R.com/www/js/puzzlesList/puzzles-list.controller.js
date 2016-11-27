angular
    .module('puzzles-list')
    .controller('PuzzlesCtrl', function ($scope, $stateParams, $timeout,  PuzzleService) {

        var page = 1;

        $scope.puzzles = [];
        $scope.hasEnded = false;


        $scope.loadMore = function() {

            page++;

            PuzzleService.getPuzzles({page : page},function(puzzles) {
                console.log('items fetched: ' + puzzles.length);
                console.log(puzzles);

                if (puzzles.length > 0) {
                    $scope.puzzles = $scope.puzzles.concat(puzzles);
                } else {
                    console.log("TELOS");
                    $scope.hasEnded = true;
                }

                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
        };

        $scope.doRefresh = function() {

            $timeout( function() {
                $scope.puzzles.push(
                    {
                        title: "LoL 20$ Riot card",
                        src: "http://icons.iconarchive.com/icons/sora-meliae/matrilineare/1024/avatar-default-icon.png"
                    }
                );

                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);

        };

    });
