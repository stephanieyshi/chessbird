
// models
var mongoose = require('mongoose');
// db configs
var db_username = process.env.DB_USERNAME.trim();
var db_password = process.env.DB_PASSWORD.trim();
var db_url = ['mongodb://', db_username, ':', db_password, '@ds155695.mlab.com:55695/chessbird'].join('');
mongoose.connect(db_url, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// schema
require('../models/games.js');

// establish routing
var routes = require('./routes.js');
routes.app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, routes.app.settings.env);
});

var client = require('./tweet.js');

// error and success callbacks
var error = function (err, response, body) {
   console.log('ERROR [%s]', err);
 };

var success = function (data) {
  console.log('Data [%s]', data);
};

dummy_chess_board = [
	[1, 2, 3, 4, 4, 3, 2, 1],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[1, 2, 3, 4, 4, 3, 2, 1]
];

client.twitter.statuses('update', {
    status: {status: client.convertChessToString(dummy_chess_board)}
  },
  "", // accessToken,
  "", // accessSecret,
  function(error, data, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      console.log(response);
    }
  }
);