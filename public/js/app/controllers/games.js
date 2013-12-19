'use strict';

MonopolyJs.controller('games', ['$scope', 'GamesService', function($scope, GamesService) {
	this.getGamesList = function() {
		GamesService.list(function(games) {
			$scope.games = games;
		});
	};

	this.getGamesList();

	$scope.submit = function() {		
		var data = {
			name: $scope.name !== undefined ? $scope.name : '',
			num_players: $scope.num_players !== undefined ? $scope.num_players : '',
		};

		var self = this;
		GamesService.post(data, function(data) {
			if (data.errors === undefined) {
				self.getGamesList();

				$scope.createGameForm.$setPristine();
				$scope.errors = $scope.name = $scope.num_players = undefined;				
			}
			else {
				$scope.errors = data.errors;
			}
		});
	};
}]);