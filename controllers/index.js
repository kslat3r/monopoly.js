var socketio = require('../lib/socketio.js');

exports.index = function(req, res, callback) {
	res.render('index');
};

exports.socketstest = function(req, res, callback) {
	socketio.instance().sockets.on('connection', function(socket) {
		setTimeout(function() {
			socket.emit('news', { hello: 'world' });
		}, 10000);

	  	socket.on('my other event', function (data) {
	    	console.log(data);
	  	});
	});

	res.render('socketstest');
}
