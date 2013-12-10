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
			if (req.user) {
				Game.find({_players: req.user.get('_id')}).populate('_players').sort({created_date_microtime: -1}).exec(function(err, Games) {
					callback(null, Games);
				});
			}
			else {
				callback(null, null);
			}
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
				token: req.csrfToken(),
				errors: req.errors != undefined ? req.errors : null,
				num_players: req.body.num_players != undefined ? req.body.num_players : null,
				name: req.body.name != undefined ? req.body.name : null,
				Game: null,
				Games: results[1]
			});
		}
	});
};

exports.createGame = function(req, res, callback) {
	req.assert('name', 'Name is required').notEmpty();
	req.assert('num_players', 'Number of players is required').notEmpty();    
    var errors = req.validationErrors();

    if (!errors) {

    	//get piece

    	async.waterfall([
    		function(callback) {
	    		
	    		//create players array

		    	var players = [];
	   			players.push(req.user);

		    	//create game object

		        var obj = {
		        	num_players: req.body.num_players,
		        	_players: players,
		        	started: false,
		        	name: req.body.name,
		        	created_date: moment().format('D/M/YY HH:mm'),
		        	created_date_microtime: (new Date).getTime()
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