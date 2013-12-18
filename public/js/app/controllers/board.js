MonopolyJs.controller('board', ['$scope', '$rootScope', '$stateParams', 'GamesService', function($scope, $rootScope, $stateParams, GamesService) {
	if ($stateParams.id !== undefined) {

		//get game when loaded event fired

		if ($scope.Game === undefined) {
			$rootScope.$on('gameLoaded', function(e, Game) {			
				$scope.Game = Game;
			});
		}
	}
}]);