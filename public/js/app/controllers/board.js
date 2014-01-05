MonopolyJs.controller('board', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams) {
	if ($stateParams.id !== undefined) {

		//get game when loaded event fired

		if ($scope.Game === undefined) {
			$rootScope.$on('gameLoaded', function(e, Game) {			
				$scope.$apply(function () {
            		$scope.Game = Game;
        		});
			});
		}
	}
}]);