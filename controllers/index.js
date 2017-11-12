var routes = require('./routes.js');
var client = require('./tweet.js');

routes.app.listen(3000);
console.log("Listening on localhost:3000");

// error and success callbacks
var error = function (err, response, body) {
   console.log('ERROR [%s]', err);
 };

var success = function (data) {
  console.log('Data [%s]', data);
};

// TODO: get accessToken and accessSecret from storage
client.twitter.statuses('update', {
    status: {status: client.convertChessToString(testArr)}
  },
  accessToken,
  accessSecret,
  function(error, data, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      console.log(response);
    }
  }
);
