MonopolyJs.controller('game', ['$scope', '$rootScope', '$stateParams', 'SocketioService', 'GamesService', 'UsersService', function($scope, $rootScope, $stateParams, $socket, GamesService, UsersService) {
	var self = this;

	//controller methods

	this.getGame = function(gameId, userId) {
		var self = this;

		GamesService.get(gameId, userId, function(Game) {
			$scope.$apply(function () {
            	$scope.Game 	= Game;
            	$scope.errors 	= {};
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

	//scope vars

	$scope.errors = {};

	//scope methods

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

	$scope.getLastTurn = function() {
		if ($scope.Game !== undefined) {
			return $scope.Game.turns[$scope.Game.turns.length-1];
		}

		return null;
	}

	$scope.rollDice = function() {	
		GamesService.rollDice($scope.Game, function(Game) {
			if (Game.errors === undefined) {
				$scope.Game 			= Game;
				$scope.errors.rollDice 	= undefined;
			}
			else {
				$scope.errors.rollDice 	= Game.errors;
			}
		});
	};

	$scope.endTurn = function() {
		GamesService.endTurn($scope.Game, function(Game) {
			if (Game.errors === undefined) {
				$scope.Game 			= Game;
				$scope.errors.endTurn 	= undefined;
			}
			else {
				$scope.errors.endTurn 	= Game.errors;
			}
		})
	}

	//constructor

	var self = this;
	this.getUser(function() {
		self.getGame($stateParams.id, $scope.User._id);	
	});
}]);