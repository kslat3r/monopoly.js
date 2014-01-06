MonopolyJs.controller('game', ['$scope', '$rootScope', '$stateParams', 'SocketioService', 'GamesService', 'UsersService', function($scope, $rootScope, $stateParams, $socket, GamesService, UsersService) {
	this.interval 		= null;
	this.refreshTimeout = 5000;

	var self = this;

	this.getGame = function(gameId, userId) {
		var self = this;

		GamesService.get(gameId, userId, function(Game) {
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

	this.getUser = function(callback) {
		UsersService.get('me', function(User) {
			$scope.User = User;
			$rootScope.$emit('userLoaded', $scope.User);

			callback();
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
		GamesService.rollDice($scope.Game, function(roll) {
			$scope.roll1 = roll[0];
			$scope.roll2 = roll[1];
		});
	};

	$scope.endTurn = function() {
		GamesService.endTurn($scope.Game, function(Game) {
			$scope.Game 	= Game;            	
        	$scope.roll1 	= undefined;
            $scope.roll2 	= undefined;
		})
	}

	//init

	var self = this;
	this.getUser(function() {
		self.getGame($stateParams.id, $scope.User._id);	
	});
}]);