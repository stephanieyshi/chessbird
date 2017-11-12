var TwitterAPI = require('node-twitter-api');

// put into environment variables
var twitter = new TwitterAPI ({
  consumerKey: process.env.CONSUMER_KEY.trim(),
  consumerSecret: process.env.CONSUMER_SECRET.trim(),
  callback: "http://localhost:3000/access-token"
});

// handle the chess state to status conversion here:
function convertChessToString (arr) {
  var toReturn  = '';
  for (var i = 0; i < arr.length; i++) {
    if (i != 0) {
      toReturn += '\n';
    }
    var column = arr[i];
    for (var j = 0; j < column.length; j++) {
      switch (column[j]) {
        // possible chess states
        case 0:
          // empty
          toReturn += String.fromCodePoint(0x2616);
          break;
        case 1:
          // white king
          toReturn += String.fromCodePoint(0x2654);
          break;
        case 2:
          // white queen
          toReturn += String.fromCodePoint(0x2655);
          break;
        case 3:
          // white chess rook
          toReturn += String.fromCodePoint(0x2656);
          break;
        case 4:
          // white chess bishop
          toReturn += String.fromCodePoint(0x2657);
          break;
        case 5:
          // white chess knight
          toReturn += String.fromCodePoint(0x2658);
          break;
        case 6:
          // white chess pawn
          toReturn += String.fromCodePoint(0x2659);
          break;
        case 7:
          // black chess king
          toReturn += String.fromCodePoint(0x265A);
          break;
        case 8:
          // black chess queen
          toReturn += String.fromCodePoint(0x265B);
          break;
        case 9:
          // black chess rook
          toReturn += String.fromCodePoint(0x265C);
          break;
        case 10:
          // black chess bishop
          toReturn += String.fromCodePoint(0x265D);
          break;
        case 11:
          // black chess knight
          toReturn += String.fromCodePoint(0x265E);
          break;
        case 12:
          // black chess pawn
          toReturn += String.fromCodePoint(0x265F);
          break;
      }
    }
  }
  return toReturn;
}

exports.convertChessToString = convertChessToString;
exports.twitter = twitter;
