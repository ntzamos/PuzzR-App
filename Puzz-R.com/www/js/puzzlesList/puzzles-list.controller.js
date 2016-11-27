angular
    .module('puzzles-list')
    .controller('PuzzlesCtrl', function ($scope, $stateParams, $timeout,  PuzzleService) {

    $scope.puzzles = [];

    //Simulate puzzles response
    for (var i = 0; i < 5; i ++) {
        if (i % 2 == 0) {
            $scope.puzzles.push(
                {
                    id: i,
                    title: "Crazy halloween mask",
                    src: "http://i52.tinypic.com/157yxeh.jpg"
                }
            )
        }
        else {
            $scope.puzzles.push(
                {
                    id: i,
                    title: "LoL 20$ Riot card",
                    src: "https://cdn.pastemagazine.com/www/articles/league%20of%20legends%20isp%20news%20square.jpg"
                }
            )
        }
    }
    console.log($scope.puzzles);

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

    // Fetches all puzzles for now. TOO SLOW. Should fetch w/ limit
    // $scope.getData = function() {
    //     PuzzleService.getPuzzles(function(puzzles) {
    //         $scope.puzzles = puzzles;
    //         console.log(puzzles);
    //     });
    // };

    // $scope.getData();
});