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
		var data = {
			name: $scope.name !== undefined ? $scope.name : '',
			num_players: $scope.num_players !== undefined ? $scope.num_players : '',
		};

		GamesService.post(data, function(data) {
			if (data.errors === undefined) {
				$rootScope.$emit('gameCreated');

				$scope.createGameForm.$setPristine();
				$scope.errors = $scope.name = $scope.num_players = undefined;				
			}
			else {
				$scope.errors = data.errors;
			}
		});
	};
}]);