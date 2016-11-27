angular
    .module('core.puzzles')
    .factory('PuzzleService', PuzzleService);

PuzzleService.$inject = ['$resource'];

function PuzzleService($resource) {
    return $resource('http://api.puzz-r.com/categories',{},{
        getPuzzles: {
            url: 'http://api.puzz-r.com/puzzles/:page',
            method: 'GET',
            isArray: true
        },
        getPuzzleById: {
            url: 'http://api.puzz-r.com/puzzle/:puzzleId',
            method: 'GET'
        }
    });
}
