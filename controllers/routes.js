var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.engine('hbs', exphbs({
    extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/semantic', express.static(path.join(__dirname, '../semantic')));
app.use('/img', express.static(path.join(__dirname, '../views/img')));

app.get('/game', function (req, res) {
  res.render('../views/play');
})

app.get('/', function (req, res) {
    res.render('../views/index');
})

app.get('/start', function (req, res) {
    res.render('../views/start');
})

exports.app = app;
