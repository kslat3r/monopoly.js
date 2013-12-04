//dependencies

var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var passport		= require('passport');
var domain			= require('domain');
var routes 			= require('./routes.js');
var app 			= express();

//config

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// ?

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	
	//sessions

	app.use(express.cookieParser());
	app.use(express.session({secret: 'm0n0p0lyj5'}));
	app.use(passport.initialize());
	app.use(passport.session());
	
	//router

	app.use(app.router);

	//error handling

	app.use(function(err, req, res, callback) {
		console.log(err.stack);
		//res.json({'errorCode': '', 'errorMsg': ''});
	  	res.send(500);
	});
});

//routes

routes.create(app);

//create server

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});