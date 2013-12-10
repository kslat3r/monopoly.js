var async 		= require('async');
var mongoose 	= require('mongoose');
var Tile 		= mongoose.model('Tile');
var Piece 		= mongoose.model('Piece');
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
			Piece.find({}).sort({machine_name: 1}).exec(function(err, Pieces) {
		  		if (err) {
		  			callback(err, null);
		  		}
		  		else {
					callback(null, Pieces);
				}
			});
		}
	], 
	function(err, results) {
		if (err) {
			callback(err, null);
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
				Pieces: results[1],
				token: req.csrfToken(),
				errors: req.errors != undefined ? req.errors : null,
				num_players: req.body.num_players != undefined ? req.body.num_players : null,
				your_piece: req.body.your_piece != undefined ? req.body.your_piece : null,
				Game: null
			});
		}
	});
};

exports.createGame = function(req, res, callback) {
	req.assert('num_players', 'Number of players is required').notEmpty();
    req.assert('your_piece', 'Your piece is required').notEmpty();
    var errors = req.validationErrors();

    if (!errors) {

    	//get piece

    	async.waterfall([
    		function(callback) {
	    		Piece.find({machine_name: req.body.your_piece}).exec(function(err, Pieces) {
		    		if (err) {
		    			callback(err, null);
		    		}
		    		else {
		    			callback(null, Pieces);
		    		}
		    	});
		    },
		    function(Pieces, callback) {		    	
	    		if (Pieces.length != 1) {
					callback(new Error('Zero or more than one piece found for machine name'), null);
				}    		
				else {
					callback(null, Pieces);
				}
		    },
		    function(Pieces, callback) {

	    		//merge user with piece

		    	var thisPlayer 		= req.user;
		    	thisPlayer.Piece 	= Pieces[0];

		    	//create players array

		    	var players = [];
	   			players.push(thisPlayer);
	
		    	//create game object

		        var obj = {
		        	num_players: req.body.num_players,
		        	players: players,
		        	started: false
		        };

		        callback(null, obj);
		    },
		    function(obj, callback) {
		    	Game.create(obj, function(err, Game) {
		    		if (err) {
		        		callback(err, null);
		        	}
		        	else {
		        		res.redirect('/games/' + Game.get('_id'));
		        	}
		    	});		    	
		    }
    	],
    	function(err, result) {
    		if (err) {
    			//todo - redirect back to create screen and display error in flash message

    			callback(err, null);
    		}
    	});
    }
    else {
        req.errors = errors;
        exports.index(req, res, callback);
    }	
}