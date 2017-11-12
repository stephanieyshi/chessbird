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

app.get('/game', function (req, res) {
  res.render('../views/game');
})

app.get('/', function (req, res) {
	res.render('index');
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

app.post('/api/new_game', function (req, res) {
  var tweetId, usernameValid;
  // make the initial tweet
  client.twitter.statuses('update', {
      status: "Let's start a game of chess!\n"
      // TODO: make sure this has the actual link
      + req.body.link
      + "\n"
      + client.convertChessToString(initialChessState)
    },
    "", //accessToken
    "", //accessSecret
    function (error, data, response) {
      if (error) {
        console.log(error);
      } else {
        // set the tweetId to be the id of the new game
        tweetId = response.body.id;
      }
  });
  player_1 = req.query['player1'].trim().toLowerCase(); //black
  player_2 = req.query['player2'].trim().toLowerCase(); //white
  // verify player2 is valid twitter user
  $.ajax({
    url: 'http://twitter.com/statuses/user_timeline.json?suppress_response_codes=1&screen_name='+player_2+'&count=1&callback=?',
    dataType: 'json',
    success: function (d) {
      if (d && d.id) {
      } else {
        alert("Player 2 invalid! Please try entering again");
      }
    }
  });
  if (Object.keys(req.query).length == 2) {
    newGame = Game({
      'player_1': player_1,
      'player_2': player_2,
      // identifier for the last tweet
      'last_tweet': tweetId
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

app.post('/api/new_move/<game_id>', function (req, res) {
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
    in_reply_to_status_id: "",//getting the last tweet id
  },
  "", //access-token,
  "", //access secret,
  function (error, data, response) {
    if (error) {
      console.log(error);
    } else {
      // send out a confirmation message
      console.log(data);
      console.log(response);
    }
  });
});

app.get('/start', function (req, res) {
  res.render('../views/start');
});

// separate route for getting the username of the starting player
var startingName;
app.get('/getUsername', function (req, res) {
  res.send(startingName);
})

// handle getting request tokens
app.get('/request-token', function(req, res) {
	console.log("SWAG");

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

// check if valid handle
app.get('/access-token', function(req, res) {
  var requestToken = req.query.oauth_token,
  verifier = req.query.oauth_verifier;
  client.twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret, results) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      client.twitter.verifyCredentials(accessToken, accessSecret, function(error, data, response) {
        // get the screen name of the user
        startingName = data["screen_name"];
        newUser = User({
        	'screen_name': startingName,
        	'access_token': accessToken,
        	'access_secret': accessSecret
        });
      newUser.save(function (err) {
          if (err) console.log(err);
          // saved!
      });
		 res.send("<script>window.close();</script>");
      });
      // send the requestToken and the _requestSecret to the database
    }
  });
});

exports.app = app;
