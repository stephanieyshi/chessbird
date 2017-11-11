var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');

var mongoose = require('mongoose'),
  Game = mongoose.model('Game');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/api/new_game', function (req, res) {
	console.log(req.query);
});

app.get('/api/state/:game_id', function (req, res) {
  Game.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
});

// app.post('/api/new_move/<game_id>', function (req, res) {
// 	// get current 

// });

exports.app = app
