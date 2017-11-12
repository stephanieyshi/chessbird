
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
require('../models/users.js');

// establish routing
var routes = require('./routes.js');
routes.app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, routes.app.settings.env);
});
