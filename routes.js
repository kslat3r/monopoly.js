var index 		= require('./controllers/index.js');
var boards 		= require('./controllers/api/boards.js');
var cards 		= require('./controllers/api/cards.js');
var dice 		= require('./controllers/api/dice.js');
var games 		= require('./controllers/api/games.js');
var pieces 		= require('./controllers/api/pieces.js');
var players		= require('./controllers/api/players.js');
var tiles	 	= require('./controllers/api/tiles.js');
var auth		= require('./controllers/auth.js');

exports.create = function(app) {
	
	//web

	app.get('/', index.index);
	app.get('/:id', index.index);
	app.post('/', index.createGame);

	//api

	app.get('/api/boards', boards.list);
	app.get('/api/boards/:id', boards.get);
	app.post('/api/boards', boards.create);
	app.delete('/api/boards/:id', boards.delete);
	app.put('/api/boards/:id', boards.update);

	app.get('/api/cards', cards.list);
	app.get('/api/cards/:id', cards.get);
	app.post('/api/cards', cards.create);
	app.delete('/api/cards/:id', cards.delete);
	app.put('/api/cards/:id', cards.update);

	app.get('/api/dice', dice.roll);
	
	app.get('/api/games', games.list);
	app.get('/api/games/:id', games.get);
	app.post('/api/games', games.create);
	app.delete('/api/games/:id', games.delete);
	app.put('/api/games/:id', games.update);

	app.get('/api/pieces', pieces.list);
	app.get('/api/pieces/:id', pieces.get);
	app.post('/api/pieces', pieces.create);
	app.delete('/api/pieces/:id', pieces.delete);
	app.put('/api/pieces/:id', pieces.update);

	app.get('/api/players', players.list);
	app.get('/api/players/:id', players.get);
	app.post('/api/players', players.create);
	app.delete('/api/players/:id', players.delete);
	app.put('/api/players/:id', players.update);

	app.get('/api/tiles', tiles.list);
	app.get('/api/tiles/:id', tiles.get);
	app.post('/api/tiles', tiles.create);
	app.delete('/api/tiles/:id', tiles.delete);
	app.put('/api/tiles/:id', tiles.update);

	//auth

	app.get('/auth/facebook', auth.facebook());
	app.get('/auth/facebook/callback', auth.facebookCallback());

	app.get('/auth/twitter', auth.twitter());
	app.get('/auth/twitter/callback', auth.twitterCallback());

	app.get('/auth/logout', auth.logout);
};