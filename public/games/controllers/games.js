'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', function ($scope, $stateParams, $location, Global, Games) {
    $scope.global = Global;

    $scope.create = function() {
        var gameData = {
            date: new Date(),
            players: [{ player: Global.user._id }]
        };

        if (typeof this.unregistered == 'undefined') {
            gameData.players.push({ player: this.player._id });
        } else {
            gameData.unregistered = this.unregistered;
        }
        var game = new Games(gameData);
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

    $scope.players = function() {
        Games.opponents(function(users) {
            $scope.players = users;
            $scope.player = $scope.players[0];
        });
        $scope.players = [];
    };

    $scope.decline = function() {
        var game = $scope.game;
        game.status = 4;
        game.$update(function() {
            $location.path('games/' + game._id);
        });
    };

    $scope.accept = function() {
        var game = $scope.game;
        game.status = 1;
        game.$update(function() {
            $location.path('games/' + game._id);
        });
    };

    $scope.approve = function() {
        var game = $scope.game;
        game.status = 3;
        game.$update(function() {
            $location.path('games/' + game._id);
        });
    };

    $scope.update = function() {
        var game = $scope.game;
        game.status = 2;
        game.$update(function() {
            $location.path('games/' + game._id);
        });
    };

}]);
