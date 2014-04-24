'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    players: [{ player: { type: Schema.ObjectId, ref: 'User' }, score: Number }],
    status: Number
});

/**
 * Statics
 */
GameSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('players.player', 'name _id').exec(cb);
};

mongoose.model('Game', GameSchema);
