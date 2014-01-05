//library includes

var mongoose 			= require('mongoose');
var fs					= require('fs');
var express 			= require('express');
var http 				= require('http');
var path 				= require('path');
var MongoStore 			= require('connect-mongo')(express);
var passport			= require('passport');
var domain				= require('domain');
var validator			= require('express-validator');
var socketio 			= require('./lib/socketio.js');

//model includes

var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file) {
	if (~file.indexOf('.js')) {
		require(modelsPath + '/' + file);
  	}
});

//custom includes

var routes 	= require('./routes.js');
var config 	= require('./config.js');

//create app

var app = express();

//session options

var sessionConfig = {
	cookieParser: express.cookieParser,
	secret: 'm0n0p0lyj5',
	cookie: {
		expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365))
	},
	store: new MongoStore({
  		url: config.db.uri
	})
};

//configure app

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	//middleware

	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));

	//sessions

	app.use(express.cookieParser());
	app.use(express.session(sessionConfig));

	//auth

	app.use(passport.initialize());
	app.use(passport.session());

	//validation

	app.use(validator());
	
	//router

	app.use(app.router);

	//error handling

	app.use(function(err, req, res, callback) {
		console.log(err.stack);

		var obj = {
			errors: [
				{
					msg: err.message,
					code: err.http_code != undefined ? err.http_code : '500'
				}
			]
		};

		res.send(obj);
	});
});

//create database

mongoose.connect(config.db.uri);

//create servers

var server = http.createServer(app).listen(app.get('port'), function() {
  	console.log('Express server listening on port ' + app.get('port'));

  	//create socket io

	socketio.create(server);

	//create routes

	routes.create(app);	
});