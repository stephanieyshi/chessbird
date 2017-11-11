import {convertChessToString} from 'tweet'
var routes = require('./routes.js');
var tweets = require('./tweet.js');

routes.app.listen(3000);
console.log("Listening on localhost:3000");

var error = function (err, response, body) {
   console.log('ERROR [%s]', err);
 };

var success = function (data) {
  console.log('Data [%s]', data);
};

function main () {
  // test 
  tweets.postTweet({status:"Hello World"}, error, success);
}
