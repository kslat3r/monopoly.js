MonopolyJs.controller('games', ['$scope', 'GamesService', function($scope, GamesService) {
	this.getGamesList = function() {
		GamesService.list(function(games) {
			$scope.games = games;
		});
	};

	this.getGamesList();

	var self = this;
	$scope.submit = function() {		
		var data = {
			name: $scope.name !== undefined ? $scope.name : '',
			numPlayers: $scope.numPlayers !== undefined ? $scope.numPlayers : '',
		};

		GamesService.create(data, function(data) {
			if (data.errors === undefined) {
				self.getGamesList();

				$scope.createGameForm.$setPristine();
				$scope.errors = $scope.name = $scope.numPlayers = undefined;				
			}
			else {
				$scope.errors = data.errors;
			}
		});
	};
}]);