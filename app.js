//dependencies

var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var index 		= require('./controllers/index.js');
var boards 		= require('./controllers/api/boards.js');
var cards 		= require('./controllers/api/cards.js');
var dice 		= require('./controllers/api/dice.js');
var games 		= require('./controllers/api/games.js');
var pieces 		= require('./controllers/api/pieces.js');
var players		= require('./controllers/api/players.js');
var tiles	 	= require('./controllers/api/tiles.js');
var app 		= express();

//config

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes

app.get('/', index.index);

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

app.get('/api/dice', dice.list);
app.get('/api/dice/:id', dice.get);
app.post('/api/dice', dice.create);
app.delete('/api/dice/:id', dice.delete);
app.put('/api/dice/:id', dice.update);

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

//create server

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});