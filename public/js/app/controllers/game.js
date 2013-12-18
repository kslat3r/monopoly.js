MonopolyJs.controller('game', ['$scope', '$rootScope', '$stateParams', 'GamesService', function($scope, $rootScope, $stateParams, GamesService) {
	var refreshGameInterval;

	function getGame(id) {
		GamesService.get(id, function(Game) {
			$scope.Game = Game;

			//redirect if no game object

			if ($scope.Game._id == undefined) {
				window.location = '/#/';
			}

			//retry api call if not all players are ready

			if ($scope.Game.num_players !== $scope.Game.players.length) {
				refreshGameInterval = setTimeout(function() {
					getGame(id)
				}, 5000);
			}
			else {
				clearTimeout(refreshGameInterval);
				$rootScope.$emit('gameLoaded', $scope.Game);
			}
		});
	}

	getGame($stateParams.id);
}]);