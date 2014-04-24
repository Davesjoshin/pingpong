'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', function ($scope, $stateParams, $location, Global, Games) {
    $scope.global = Global;

    $scope.create = function() {
        var game = new Games({
            date: new Date(),
            player: this.user
        });
        game.$save(function(response) {
            $location.path('games/' + response._id);
        });


    };



    $scope.find = function() {
        Games.query(function(games) {
            $scope.games = games;
        });
        $scope.games = [];
    };

    $scope.findOne = function() {
        Games.get({
            gameId: $stateParams.gameId
        }, function(game) {
            $scope.game = game;
        });
    };
}]);
