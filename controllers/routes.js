var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var User = mongoose.model('User');

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

var passport = require('passport');
var session = require('express-session');
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: 'TOP_SECRET_OMG',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
}));
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/game/:game_id', function (req, res) {
  res.render('../views/game');
});

app.get('/start', function (req, res) {
	Game.findOne({
		$or: [{'player_1': req.user.screen_name}, {'player_2': req.user.screen_name}]
	}, function (err, doc) {
		if (doc) {
			console.log(doc);
			res.redirect('/game/' + doc._id);
		} else {
			res.render('../views/start', {player1 : req.user});
		}
	});
});

app.get('/user',
  function(req, res) {
  	console.log(req);
    res.send(req.user);
});

var _requestSecret, userhandle, player_1, player_2;
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

var tweetId;

app.post('/api/new_game', function (req, res) {
  var player_1 = req.query['player1'];
  var player_2 = req.query['player2'];
  console.log(player_1);
  console.log(player_2);
  User.findOne({screen_name: player_1}, function (err, doc) {
    if (!doc) {
      console.log("nothing found");
    } else {
      // make the initial tweet
      client.twitter.statuses('update', {
          status: "@" + player_2 + ", Let's start a game of chess!" + 
          + "\n"
          + client.convertChessToString(initialChessState)
        },
        doc.access_token, //accessToken of player 1
        doc.access_secret, //accessSecret of player 1
        function (error, data, response) {
          if (error) {
            console.log(error);
          } else {
            // set the tweetId to be the id of the new game
            tweetId = data.id;
          }
      });
      if (Object.keys(req.query).length == 2) {
        newGame = Game({
          'player_1': player_1,
          'player_2': player_2,
          // identifier for the last tweet
          'last_tweet': tweetId,
          'board_state': 'start'
        });
        newGame.save(function (err) {
          if (err) console.log(err);
          // saved!
        });
      }
    }
  })
});

app.get('/api/state/:game_id', function (req, res) {
  Game.findOne({id: req.params.game_id}, function(err, doc) {
  	res.json(doc.board_state);
  });
});

app.post('/api/new_move/<game_id>', function (req, res) {
  var player_2 = req.query['player_2'].trim();
  var player_1 = req.user.screen_name;
  var lastTweet;
  Game.findOne({ id: game_id}, function (err, doc) {
    if (!doc) {
      // the game does not exists
      console.log("Not found!");
    } else {
      console.log("Found");
      lastTweet = doc.last_tweet;
    }
  });
	// sending updated game state and updating the board
  var chess = client.convertChessToString(req.body.board);
  var handle;
  if (req.body.player == b) {
    handle = "@" + player_2;
  } else {
    handle = "@" + player_1;
  };
  // TODO: get the last game using the game id parameter
  // get the acces token and the access secret using the username
  // send the update
  client.twitter.statuses('update', {
    status: handle + "\n" + chess,
    in_reply_to_status_id: lastTweet,//getting the last tweet id
  },
  req.user.access_token, //access-token,
  req.user.access_secret, //access secret,
  function (error, data, response) {
    if (error) {
      console.log(error);
    } else {
      // send out a confirmation message
      console.log(data);
      console.log(response);
      // send out a success response
      res.send('move successful');
    }
  });
});

// separate route for getting the username of the starting player
app.get('/getUsername', function (req, res) {
  res.send(req.user.screen_name);
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
  		userJson = {
  					screen_name: profile.username,
    				access_token: token,
    				access_secret: tokenSecret
    			}
  		User.findOne({ screen_name: profile.username }, function(err, doc) {
  			if (!doc) {  // user doesn't exist
  				console.log("Not Found!");
  				newUser = new User(userJson);
				newUser.save(function (err) {
          			if (err) console.log(err);
          			return cb(err, userJson);
      			});
  			} else {
  				console.log("Found!");
  				doc.access_token = token;
  				doc.access_secret = tokenSecret;
  				return cb(err, userJson);
  			}
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
    res.redirect('/start');
  });

exports.app = app;
