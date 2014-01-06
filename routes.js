var socketio 	= require('./lib/socketio.js');

var auth		= require('./controllers/auth.js');

var index 		= require('./controllers/index.js');
var partials	= require('./controllers/partials.js');

var gamesApi	= require('./controllers/api/games.js');
var usersApi	= require('./controllers/api/users.js');

exports.create = function(app) {

	//sockets

	socketio.instance().sockets.on('connection', function(socket) {
	  	socket.on('game:get', function(data, outputFn) {
            gamesApi.get(data, socket, outputFn);
        });
	});

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

    app.get('/api/games', gamesApi.list);
    app.get('/api/users/:id', usersApi.get);

    app.post('/api/games', gamesApi.create);

    app.put('/api/games/:id', gamesApi.update);
    app.put('/api/games/:id/rollDice', gamesApi.rollDice);
    app.put('/api/games/:id/endTurn', gamesApi.endTurn);    

    app.delete('/api/games/:id', gamesApi.delete);


};