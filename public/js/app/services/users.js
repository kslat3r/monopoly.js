MonopolyJs.service('UsersService', function($http) {
	return {
		get: function(id, callback) {
			return $http.get('/api/users/' + id).success(function(game) {
				callback(game);
			});
		}
	}
});