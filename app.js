//library includes

var mongoose 		= require('mongoose');
var fs				= require('fs');
var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var MongoStore 		= require('connect-mongo')(express);
var passport		= require('passport');
var domain			= require('domain');
var validator		= require('express-validator');

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
	app.use(express.session({
		secret: 'm0n0p0lyj5',
		cookie: {
			expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365))
		},
		store: new MongoStore({
      		url: config.db.uri
    	})
	}));

	//auth

	app.use(passport.initialize());
	app.use(passport.session());

	//csrf protection

	app.use(express.csrf());

	//validation

	app.use(validator());
	
	//router

	app.use(app.router);

	//error handling

	app.use(function(err, req, res, callback) {
		console.log(err.stack);		
		res.json({errorCode: (err.http_code != undefined ? err.http_code : '500'), errorMsg: err.message});
	});
});

//create database

mongoose.connect(config.db.uri);

//create routes

routes.create(app);

//create server

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});