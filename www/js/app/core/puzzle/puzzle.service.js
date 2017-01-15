angular
    .module('core.puzzle')
    .factory('PuzzleService', PuzzleService);

PuzzleService.$inject = ['$resource'];

function PuzzleService($resource) {
    return $resource('http://api.puzz-r.com/categories',{},{
        checkUser: {
            url: 'http://api.puzz-r.com/login/:email',
            method: 'GET',
            isArray: true
        },
        getPuzzles: {
            url: 'http://api.puzz-r.com/puzzles/:page',
            method: 'GET',
            isArray: true
        },
        getPuzzlesEnded: {
            url: 'http://api.puzz-r.com/puzzles/ended/:page',
            method: 'GET',
            isArray: true
        },
        getPuzzleById: {
            url: 'http://api.puzz-r.com/puzzle/:puzzleId',
            method: 'GET'
        },
        getPuzzlesByCategory: {
            url: 'http://api.puzz-r.com/puzzles/category/:categoryId/:page',
            method: 'GET',
            isArray: true
        },
        postPlay: {
            url: 'http://api.puzz-r.com/play',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            isArray: true
        }
    });
}
