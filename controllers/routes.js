var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var User = mongoose.model('User')


var app = express();
var client  = require('./tweet.js');

// setup handlebars engine
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// establish routes for public static resources
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/semantic', express.static(path.join(__dirname, '../semantic')));
app.use('/img', express.static(path.join(__dirname, '../views/img')));

// establish express middleware
var session = require("express-session");
var bodyParser = require("body-parser");

var passport = require('passport');
var session = require('express-session');
app.use(session({
  secret: 'TOP_SECRET_OMG',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions


app.get('/game', function (req, res) {
  res.render('../views/game');
});

app.get('/', function (req, res) {
	res.render('index');
});
var _requestSecret, userhandle;
var initialChessState =
[
  [3, 5, 4, 5, 1, 4, 5, 3],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [12, 12, 12, 12, 12, 12, 12, 12],
  [9, 11, 10, 8, 7, 10, 11, 9]
]

// error and success callbacks
var error = function (err, response, body) {
   console.log('ERROR [%s]', err);
 };

var success = function (data) {
  console.log('Data [%s]', data);
};

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
  // make the initial tweet
  client.twitter.statuses('update', {
      status: "Let's start a game of chess!\n"
      + req.query['link']
      + "\n"
      + client.convertChessToString(initialChessState)
    },
    "", //accessToken
    "", //accessSecret
    function (error, data, response) {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        console.log(response);
      }
  });
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


/*
 * Twitter Authentication
 */

var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
		consumerKey: process.env.CONSUMER_KEY.trim(),
	  	consumerSecret: process.env.CONSUMER_SECRET.trim(),
	  	callbackURL: "http://localhost:3000/auth/twitter/callback"
  	},
  	function(token, tokenSecret, profile, cb) {
    	User.findOrCreate({ twitterId: profile.id }, function (err, user) {
     		return cb(err, user);
    	});
  	}
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// // handle getting request tokens
// app.get('/request-token', function(req, res) {
// 	console.log("SWAG");

//   client.twitter.getRequestToken(function(err, requestToken, requestSecret) {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       _requestSecret = requestSecret;
//       // redirect to login page
//       res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
//     }
//   });
// });

// // check if valid handle
// app.get('/access-token', function(req, res) {
//   var requestToken = req.query.oauth_token,
//   verifier = req.query.oauth_verifier;
//   client.twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret, results) {
//     if (err) {
//       res.status(500).send(err);
//     }
//     else {
//       client.twitter.verifyCredentials(accessToken, accessSecret, function(error, data, response) {
//         // get the screen name of the user
//         screenName = data["screen_name"];
//         newUser = User({
//         	'screen_name': screenName,
//         	'access_token': accessToken,
//         	'access_secret': accessSecret
//         });
//         newUser.save(function (err) {
// 		  if (err) console.log(err);
// 		  // saved!
// 		});
// 		res.send("<script>window.close();</script>");
//       });
//       // send the requestToken and the _requestSecret to the database
//     }
//   });
// });

exports.app = app;
