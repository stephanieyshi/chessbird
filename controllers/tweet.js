var Twitter = require('twitter');

// put into environment variables
var config = {
  "consumer_key": process.env.CONSUMER_KEY,
	"consumer_secret": process.env.CONSUMER_SECRET,
	"access_token_key": process.env.ACCESS_TOKEN_KEY,
	"access_token_secret": process.env.ACCESS_TOKEN_SECRET
}

var client = new Twitter(config);

// handle the chess state to status conversion here:
var convertChessToString = function (arr) {
  var toReturn  = '';
  for (var i = 0; i < arr.length; i++) {
    toReturn += '\n';
    var column = arr[i];
    for (var j = 0; j < column.length; i++) {
      switch (column[j]) {
        // possible chess states
        case 0:
          // empty
          toReturn += String.fromCodePoint(0x2616);
        case 1:
          // white king
          toReturn += String.fromCodePoint(0x2654);
        case 2:
          // white queen
          toReturn += String.fromCodePoint(0x2655);
        case 3:
          // white chess rook
          toReturn += String.fromCodePoint(0x2656);
        case 4:
          // white chess bishop
          toReturn += String.fromCodePoint(0x2657);
        case 5:
          // white chess knight
          toReturn += String.fromCodePoint(0x2658);
        case 6:
          // white chess pawn
          toReturn += String.fromCodePoint(0x2659);
        case 7:
          // black chess king
          toReturn += String.fromCodePoint(0x265A);
        case 8:
          // black chess queen
          toReturn += String.fromCodePoint(0x265B);
        case 9:
          // black chess rook
          toReturn += String.fromCodePoint(0x265C);
        case 10:
          // black chess bishop
          toReturn += String.fromCodePoint(0x265D);
        case 11:
          // black chess knight
          toReturn += String.fromCodePoint(0x265E);
        case 12:
          // black chess pawn
          toReturn += String.fromCodePoint(0x265F);
      }
    }
  }
  return toReturn;
}

exports.client = client;
