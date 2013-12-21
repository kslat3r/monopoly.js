MonopolyJs.service('DiceService', function($http) {
	return {
		get: function(Game, callback) {
			return $http.get('/api/dice?gameId=' + Game._id.toString()).success(function(roll) {
				callback(roll);
			});
		}
	}
});