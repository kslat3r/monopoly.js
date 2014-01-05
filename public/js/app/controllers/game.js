MonopolyJs.controller('game', ['$scope', '$rootScope', '$stateParams', 'SocketioService', 'GamesService', 'UsersService', 'DiceService', function($scope, $rootScope, $stateParams, $socket, GamesService, UsersService, DiceService) {
	this.interval 		= null;
	this.refreshTimeout = 5000;

	var self = this;

	this.getGame = function(id) {
		var self = this;

		GamesService.get(id, function(Game) {
			$scope.$apply(function () {
            	$scope.Game = Game;
        	});
        	
			$rootScope.$emit('gameLoaded', $scope.Game);

			//redirect if no game object

			if ($scope.Game._id == undefined) {
				window.location = '/#/';
			}
		});			
	};

	this.getUser = function() {
		UsersService.get('me', function(User) {
			$scope.User = User;
			$rootScope.$emit('userLoaded', $scope.User);
		});
	};

	$scope.isItMyTurn = function() {
		if ($scope.Game !== undefined && $scope.User !== undefined) {
			if ($scope.Game.players[$scope.Game.currentPlayer].userId === $scope.User._id.toString()) {
				return true;
			}
		}

		return false;
	};

	$scope.getCurrentPlayerFriendlyName = function() {
		if ($scope.Game !== undefined) {
			return $scope.Game.players[$scope.Game.currentPlayer].friendlyName;
		}

		return null;
	};

	$scope.rollDice = function() {	
		DiceService.get($scope.Game, function(roll) {
			$scope.roll1 = roll[0];
			$scope.roll2 = roll[1];
		});
	};

	//init

	this.getUser();
	this.getGame($stateParams.id);
}]);