angular
    .module('puzzles-list')
    .controller('PuzzlesCtrl', function ($scope, $stateParams, $timeout,  PuzzleService) {

        $scope.puzzles = [];

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

        $scope.getData = function() {
            PuzzleService.getPuzzles(function(puzzles) {
                $scope.puzzles = puzzles;
                console.log(puzzles);
            });
        };

        $scope.getData();
    });
