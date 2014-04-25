'use strict';

//Games service used for games REST endpoint
angular.module('mean.games').factory('Games', ['$resource', function($resource) {
    return $resource('games/:gameId', {
                gameId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                opponents: {
                    method: 'GET',
                    url: 'games/new',
                    isArray: true
                }
            });
    // return {
    //     Default: $resource('games/:gameId', {
    //         gameId: '@_id'
    //     }, {
    //         update: {
    //             method: 'PUT'
    //         }
    //     }),
    //     Opponents: $resource('games/new'),
    //
    // };
}]);
