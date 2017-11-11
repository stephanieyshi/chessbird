var Twitter = require('twitter');

// put into environment variables
var config = {
  "consumer_key": "rd5ca3rFW7dimqQCh1SdiYcOb",
	"consumer_secret": "x3bihWCrj1gjZdPgbATf6S5bTrHsXrnbCYYrZMgA8g7A4nMI57",
	"access_token_key": "929380989775867904-f3YgvYh0QIiJSaqu0SgECoXFR02OQkG",
	"access_token_secret": "zm2Yc1qSncLdHv7o10G9y1N8I0JqsWx7TBh036tYVEXE2",
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
