MonopolyJs.controller('game', ['$scope', '$stateParams', 'GamesService', function($scope, $stateParams, GamesService) {
	function getGame(id) {
		GamesService.get(id, function(game) {
			$scope.game = game;

			if ($scope.game._id == undefined) {
				window.location = '/#/';
			}
		});
	}

	getGame($stateParams.id);
}]);