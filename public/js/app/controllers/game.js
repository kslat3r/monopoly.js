MonopolyJs.controller('game', ['$scope', '$stateParams', 'GamesService', function($scope, $stateParams, GamesService) {
	var refreshGameInterval;

	function getGame(id) {
		GamesService.get(id, function(game) {
			$scope.game = game;

			//redirect if no game object

			if ($scope.game._id == undefined) {
				window.location = '/#/';
			}

			//retry api call if not all players are ready

			if ($scope.game.num_players !== $scope.game.players.length) {
				refreshGameInterval = setTimeout(function() {
					getGame(id)
				}, 5000);
			}
			else {
				clearTimeout(refreshGameInterval);
			}
		});
	}

	getGame($stateParams.id);
}]);