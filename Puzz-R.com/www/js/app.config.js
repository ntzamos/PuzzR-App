angular
    .module('starter', [
        'ionic',
        'categories',
        'puzzles-list',
        'puzzle-details',
        'starter.controllers'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'js/menu/menu.template.html',
                controller: 'AppCtrl'
            })
            .state('app.categories', {
                url: '/categories',
                views: {
                    'menuContent': {
                        templateUrl: 'js/puzzleCategories/puzzle-categories.template.html',
                        controller: 'CategoriesCtrl'
                    }
                }
            })
            .state('app.puzzles', {
                url: '/puzzles',
                views: {
                    'menuContent': {
                        templateUrl: 'js/puzzlesList/puzzles-list.template.html',
                        controller: 'PuzzlesCtrl'
                    }
                }
            })
            .state('app.singlePuzzle', {
                url: '/puzzles/:puzzleId',
                views: {
                    'menuContent': {
                        templateUrl: 'js/puzzleDetails/puzzle-details.template.html',
                        controller: 'PuzzleDetailsCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/app/puzzles');
    });
