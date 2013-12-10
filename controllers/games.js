var async		= require('async');
var mongoose 	= require('mongoose');
var Tile 		= mongoose.model('Tile');
var Game 		= mongoose.model('Game');

exports.index = function(req, res, callback) {
	async.parallel([
		function(callback) {
			Tile.find({}).sort({position: 1}).exec(function(err, Tiles) {
				if (err) {
  					callback(err, null);
  				}
  				else {
  					callback(null, Tiles);
  				}
  			});
		},
		function(callback) {
			Game.findById(req.params.id).populate('_players').exec(function(err, Game) {
		  		if (err) {
		  			callback(err, null);
		  		}
		  		else {
		  			if (req.user != undefined) {
			  			Game.addUser(req.user, function(err, Game) {			  				
			  				if (err) {
			  					callback(err, null);
			  				}
			  				else {
		  						callback(null, Game);
		  					}
			  			});
			  		}
			  		else {
			  			callback(null, Game);
			  		}
				}
			});
		}
	], 
	function(err, results) {
		if (err) {
			callback(err, null);
		}
		else if (results[1].get('_id') == null) {
			res.redirect('/');
		}
		else {
			var bottom 	= results[0].splice(0, 11).reverse();
	  		var left 	= results[0].splice(0, 9).reverse();
	  		var top 	= results[0].splice(0, 11);
	  		var right 	= results[0].splice(0, 9);

			res.render('game', {
				title: 'MonopolyJs',
				BottomTiles: bottom,
				LeftTiles: left,
				TopTiles: top,
				RightTiles: right,
				User: req.user,
				token: req.csrfToken(),
				Game: results[1]
			});
		}
	});
};