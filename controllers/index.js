var routes = require('./routes.js');
var tweet = require('./tweet.js');

routes.app.listen(3000);
console.log("Listening on localhost:3000");

var error = function (err, response, body) {
   console.log('ERROR [%s]', err);
 };

var success = function (data) {
  console.log('Data [%s]', data);
};

// get testarr from Brandon
tweet.client.post('statuses/update', {status: tweet.convertChessToString(testArr)}, function (error, tweet, response) {
  if(error) {
    console.log(error);
  };
  // do some verification here
   console.log(tweet);  // Tweet body.
   console.log(response);  // Raw response object.
});
