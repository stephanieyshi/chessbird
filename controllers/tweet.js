var Twitter = require('twitter-js-client').Twitter;

var error = function (err, response, body) {
   console.log('ERROR [%s]', err);
 };

var success = function (data) {
  console.log('Data [%s]', data);
};

var config = {
  "consumerKey": "rd5ca3rFW7dimqQCh1SdiYcOb",
	"consumerSecret": "x3bihWCrj1gjZdPgbATf6S5bTrHsXrnbCYYrZMgA8g7A4nMI57",
	"accessToken": "929380989775867904-f3YgvYh0QIiJSaqu0SgECoXFR02OQkG",
	"accessTokenSecret": "zm2Yc1qSncLdHv7o10G9y1N8I0JqsWx7TBh036tYVEXE2",
	"callBackUrl": "https://chessbird.herokuapp.com/"
}

var twitter = new Twitter(config);

// handle the chess state to status conversion here:
var convertChessState = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var column = arr[i];
    for (var j = 0; j < column.length; i++) {
      switch (column[j]) {
        // possible chess states
        case 0:
          // empty
          column[j] = String.fromCodePoint(0x2616);
        case 1:
          // white king
          column[j] = String.fromCodePoint(0x2654);
        case 2:
          // white queen
          column[j] = String.fromCodePoint(0x2655);
        case 3:
          // white chess rook
          column[j] = String.fromCodePoint(0x2656);
        case 4:
          // white chess bishop
          column[j] = String.fromCodePoint(0x2657);
        case 5:
          // white chess knight
          column[j] = String.fromCodePoint(0x2658);
        case 6:
          // white chess pawn
          column[j] = String.fromCodePoint(0x2659);
        case 7:
          // black chess king
          column[j] = String.fromCodePoint(0x265A);
        case 8:
          // black chess queen
          column[j] = String.fromCodePoint(0x265B);
        case 9:
          // black chess rook
          column[j] = String.fromCodePoint(0x265C);
        case 10:
          // black chess bishop
          column[j] = String.fromCodePoint(0x265D);
        case 11:
          // black chess knight
          column[j] = String.fromCodePoint(0x265E);
        case 12:
          // black chess pawn
          column[j] = String.fromCodePoint(0x265F);
      }
    }
  }
  return arr;
}

// to make a tweet
// twitter.postTweet(parameter, error, success);
exports.twitter = twitter;
