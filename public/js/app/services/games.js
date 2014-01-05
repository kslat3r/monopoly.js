MonopolyJs.service('GamesService', ['SocketioService', '$http', function($socket, $http) {
	return {
		list: function(callback) {
			return $http.get('/api/games').success(function(games) {				
				callback(games);
			});
		},

		get: function(id, callback) {
			$socket.emit('game:get', {id: id}, function(data) {
      			callback(data);
    		});

    		$socket.on('game:update', function(Game) {
				callback(Game);
			});
		},

		post: function(data, callback) {
			return $http.post('/api/games', data).success(function(game) {
				callback(game);
			});	
		}
	}
}]);