'use strict';

angular.module('mean.games').controller('GamesController', ['$scope', '$stateParams', '$location', 'Global', 'Games', function ($scope, $stateParams, $location, Global, Games) {
    $scope.global = Global;

    $scope.create = function(user) {
        var game = new Games({
            date: new Date(),
            player: this.player.email
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

    $scope.players = function() {
        Games.opponents(function(users) {
            console.log(users);
            $scope.players = users;
        });
        $scope.players = [];
    }

    $scope.decline = function(game) {
        var game = $scope.game;
        game.status = 3;
        game.$update(function() {
            $location.path('games/' + game._id);
        });
    }

    $scope.accept = function(game) {
        var game = $scope.game;
        game.status = 1;
        game.$update(function() {
            $location.path('games/' + game._id);
        });
    }

}]);
