MonopolyJs.controller('game', ['$scope', '$rootScope', '$stateParams', 'GamesService', 'UsersService', 'DiceService', function($scope, $rootScope, $stateParams, GamesService, UsersService, DiceService) {
	this.interval 		= null;
	this.refreshTimeout = 5000;

	var self = this;

	this.getGame = function(id) {
		var self = this;

		GamesService.get(id, function(Game) {
			$scope.Game = Game;
			$rootScope.$emit('gameLoaded', $scope.Game);

			//redirect if no game object

			if ($scope.Game._id == undefined) {
				window.location = '/#/';
			}

			//clear timeout if it's my turn

			if ($scope.isItMyTurn()) {
				self.clearAutoRefresh();
			}
		});			
	};

	this.getUser = function() {
		UsersService.get('me', function(User) {
			$scope.User = User;
			$rootScope.$emit('userLoaded', $scope.User);
		});
	};

	this.autoRefresh = function() {
		var self = this;

		this.interval = setInterval(function() {
			self.getGame($stateParams.id);
		}, this.refreshTimeout);	
	};

	this.clearAutoRefresh = function() {
		clearTimeout(this.interval);
	}

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
			self.getGame($stateParams.id);
		});
	};

	//init

	this.getUser();
	this.getGame($stateParams.id);
	this.autoRefresh();
}]);