var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var mongoose = require('mongoose'),
  Game = mongoose.model('Game');

var app = express();
var client  = require('./tweet.js');

// setup handlebars engine
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// establish routes for public static resources
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/semantic', express.static(path.join(__dirname, '../semantic')));
app.use('/img', express.static(path.join(__dirname, '../views/img')));

app.get('/game', function (req, res) {
  res.render('../views/play');
})

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

app.get('/start', function (req, res) {
    res.render('../views/start');
})

var _requestSecret;
// handle getting request tokens
app.get('/request-token', function(req, res) {
  client.twitter.getRequestToken(function(err, requestToken, requestSecret) {
    if (err) {
      res.status(500).send(err);
    } else {
      _requestSecret = requestSecret;
      // redirect to login page
      res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
    }
  });
});

app.get('/access-token', function(req, res) {
  var requestToken = req.query.oauth_token,
  verifier = req.query.oauth_verifier;
  client.twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret, results) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      // use the access token and the access secret to pass into the update
      client.twitter.verifyCredentials(accessToken, accessSecret, params, function(error, data, response) {
        if (error) {

        } else {
          res.json({screen_name: data["screen_name"]})
        }
      })
    }
  });
});

exports.app = app
