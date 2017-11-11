var express = require('express')
var app = express()

app.set('json spaces', 4)

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/api', (req, res) => {
  res.send(JSON.stringify({
  	test: 'yeah'
  }))
})

exports.app = app
