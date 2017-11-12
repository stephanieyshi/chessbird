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
	player_1 = req.query['player1'].trim().toLowerCase();
	player_2 = req.query['player2'].trim().toLowerCase();

	// verify query parameters
	// TODO: verify player2 is valid twitter user
	if (Object.keys(req.query).length == 2) {
		newGame = Game({
			'player_1': player_1,
			'player_2': player_2,
			'last_tweet': "https://twitter.com/santigoodtime/status/929434636605968384"
		});
		newGame.save(function (err) {
		  if (err) console.log(err);
		  // saved!
		});
	}

	console.log(req.query);
	res.send("Dope swag!");
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
