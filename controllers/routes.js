var express = require('express')
var app = express()

app.set('json spaces', 4)

app.get('/', (req, res) => {
  	res.send('Hello World');
})

app.get('/api', (req, res) => {
  	res.json({
  		test: 'yeah'
  	})
})

app.get('/api/valid', (req, res) => {
	// Takes in the board state as a string and a move and returns if it is valid
})

app.get('/api/check', (req, res) => {
	// Takes in a board and checks if a player is in check; returns which
	// player is in check right now
})

app.get('/api/checkmate', (req, res) => {
	// Checks if a player has lost
})



exports.app = app
