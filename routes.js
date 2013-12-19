var auth		= require('./controllers/auth.js');

var index 		= require('./controllers/index.js');
var partials	= require('./controllers/partials.js');

var diceApi		= require('./controllers/api/dice.js');
var gamesApi	= require('./controllers/api/games.js');
var usersApi	= require('./controllers/api/users.js');

exports.create = function(app) {
	
	//auth

	app.get('/auth/facebook', auth.facebook());
	app.get('/auth/facebook/callback', auth.facebookCallback());

	app.get('/auth/twitter', auth.twitter());
	app.get('/auth/twitter/callback', auth.twitterCallback());

	app.get('/auth/logout', auth.logout);

	//web

	app.get('/', index.index);
	
	//partials

	app.get('/partials/board', partials.board);
	app.get('/partials/title', partials.title);
	app.get('/partials/auth', partials.auth);
	app.get('/partials/info', partials.info);
	app.get('/partials/games', partials.games);
	app.get('/partials/game', partials.game);

	//api

	app.get('/api/dice', diceApi.roll);
	
	app.get('/api/games', gamesApi.list);
	app.post('/api/games', gamesApi.post);
	app.get('/api/games/:id', gamesApi.get);
	app.put('/api/games/:id', gamesApi.put);
	app.delete('/api/games/:id', gamesApi.delete);

	app.get('/api/users/:id', usersApi.get);
};