var io 			= require('socket.io');
var socketio 	= null;

exports.create = function(server, app, callback) {	
	socketio = io.listen(server);
}

exports.instance = function() {
	return socketio;
}