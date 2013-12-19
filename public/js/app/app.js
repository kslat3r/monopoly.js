'use strict';

var MonopolyJs = angular.module('MonopolyJs', ['ui.router']);

MonopolyJs.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('index', {
		url: "/",
		views: {
			"board": { templateUrl: "/partials/board" },
			"title": { templateUrl: "/partials/title" },
			"auth": { templateUrl: "/partials/auth" },
			"games": { templateUrl: "/partials/games" }
  		}
	})
	.state('game', {
		url: "/game/:id",
		views: {
			"board": { templateUrl: "/partials/board" },
			"title": { templateUrl: "/partials/title" },
			"auth": { templateUrl: "/partials/auth" },
			"game": { templateUrl: "/partials/game" },
			"info": { templateUrl: "/partials/info" }
  		},
  		controller: 'game'
	});

	$urlRouterProvider.otherwise('/');
}]);