'use strict';

MonopolyJs.controller('games.list', ['$scope', 'GamesService', '$rootScope', function($scope, GamesService, $rootScope) {
	function listGames() {
		GamesService.list(function(games) {
			$scope.games = games;
		});	
	}

	$rootScope.$on('gameCreated', function() {
		listGames();
	});

	listGames();
}]);

MonopolyJs.controller('games.create', ['$scope', 'GamesService', '$rootScope', function($scope, GamesService, $rootScope) {
	$scope.submit = function() {
		GamesService.post({name: $scope.game.name, num_players: $scope.game.num_players}, function(game) {
			if (game._id !== undefined) {
				$rootScope.$emit('gameCreated');

				$scope.createGameForm.$setPristine();
				$scope.game = {};				
			}
			else {

			}
		});
	};
}]);