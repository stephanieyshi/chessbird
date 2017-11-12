'use strict';

//import dependency
var mongoose = require('mongoose');
var shortId = require('shortid');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var GamesSchema = new Schema({
	_id: {
	    type: String,
	    unique: true,
	    'default': shortId.generate
	},
 	player_1: String,
 	player_2: String,
 	board_state: String,
 	last_tweet: String
});

//export our module to use in server.js
module.exports = mongoose.model('Game', GamesSchema);
