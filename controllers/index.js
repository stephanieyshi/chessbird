var routes = require('./routes.js')

routes.app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, routes.app.settings.env);
});
