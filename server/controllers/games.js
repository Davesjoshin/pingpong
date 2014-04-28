'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    User = mongoose.model('User'),
    _ = require('lodash');



/**
 * Delete a game
 */
exports.destroy = function(req, res) {
    var game = req.game;
    game.remove(function(err) {
        if (err) {
            return res.send('/', {
                errors: err.errors,
                game: game
            });
        } else {
            res.jsonp(game);
        }
    });
};

/**
 * Find game by id
 */
exports.game = function(req, res, next, id) {
    Game.load(id, function(err, game) {
        if (err) return next(err);
        if (!game) return next(new Error('Failed to load game ' + id));
        req.game = game;
        next();
    });
};


/**
 * List of Games
 */
exports.all = function(req, res) {
    Game.find({ status : { $ne : 4 }}).sort('-date').populate('players.player', 'name username').exec(function(err, games) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(games);
        }
    });
};

/**
 * List of Oppponents
 */
exports.opponents = function(req, res) {
    User.find({ email: { $ne : req.user.email }}, {email: 1, name: 1}).sort('name').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};


/**
 * Create a game
 */
exports.create = function(req, res) {
    var game = new Game(req.body);
    game.save(function(err) {
        if (err) {
            return res.send('/', {
                errors: err.errors,
                game: game
            });
        } else {
            res.jsonp(game);
        }
    });

};

/**
 * Show a game
 */
exports.show = function(req, res) {
    res.jsonp(req.game);
};


/**
 * Update a game
 */
exports.update = function(req, res) {
    var game = req.game;

    game = _.extend(game, req.body);

    game.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                game: game
            });
        } else {
            res.jsonp(game);
        }
    });
};
