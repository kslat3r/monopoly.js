MonopolyJs.service('GamesService', function($http) {
	return {
		list: function(callback) {
			return $http.get('/api/games').success(function(games) {				
				callback(games);
			});
		},

		post: function(data, callback) {
			return $http.post('/api/games', data).success(function(game) {
				callback(game);
			});	
		}
	}
});