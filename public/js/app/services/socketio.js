var instance = null;

MonopolyJs.factory('SocketioService', function() {
	if (instance === null) {
		instance = io.connect('http://localhost:3000');
	}

	return instance;
});