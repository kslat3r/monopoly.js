var auth		= require('./controllers/auth.js');
var index 		= require('./controllers/index.js');
var games 		= require('./controllers/games.js');
var dice 		= require('./controllers/api/dice.js');

exports.create = function(app) {
	
	//auth

	app.get('/auth/facebook', auth.facebook());
	app.get('/auth/facebook/callback', auth.facebookCallback());

	app.get('/auth/twitter', auth.twitter());
	app.get('/auth/twitter/callback', auth.twitterCallback());

	app.get('/auth/logout', auth.logout);

	//web

	app.get('/', index.index);
	app.post('/', index.createGame);

	app.get('/games/:id', games.index);

	//api

	app.get('/api/dice', dice.roll);
};