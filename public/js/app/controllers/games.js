'use strict';

MonopolyJs.controller('games', ['$scope', 'GamesService', function($scope, GamesService) {
	function getGamesList() {
		GamesService.list(function(games) {
			$scope.games = games;
		});
	}

	getGamesList();

	$scope.submit = function() {		
		var data = {
			name: $scope.name !== undefined ? $scope.name : '',
			num_players: $scope.num_players !== undefined ? $scope.num_players : '',
		};

		GamesService.post(data, function(data) {
			if (data.errors === undefined) {
				getGamesList();

				$scope.createGameForm.$setPristine();
				$scope.errors = $scope.name = $scope.num_players = undefined;				
			}
			else {
				$scope.errors = data.errors;
			}
		});
	};
}]);