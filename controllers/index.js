var async = require('async');

var TilesProvider = require('../providers/tiles.js').Provider;
TilesProvider = new TilesProvider();

var PiecesProvider = require('../providers/pieces.js').Provider;
PiecesProvider = new PiecesProvider();

var GamesProvider = require('../providers/games.js').Provider;
GamesProvider = new GamesProvider();

exports.index = function(req, res, callback) {
	async.parallel([
		function(callback) {
			TilesProvider.list(function(err, tiles) {
				if (err) {
  					callback(err, null);
  				}
  				else {
  					callback(null, tiles);
  				}
  			});
		},
		function(callback) {
			PiecesProvider.list(function(err, pieces) {
		  		if (err) {
		  			callback(err, null);
		  		}
		  		else {
					callback(null, pieces);  		
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

			res.render('index', {
				title: 'MonopolyJs',
				bottomTiles: bottom,
				leftTiles: left,
				topTiles: top,
				rightTiles: right,
				user: req.user,
				pieces: results[1],
				token: req.csrfToken(),
				errors: req.errors != undefined ? req.errors : null,
				num_players: req.body.num_players != undefined ? req.body.num_players : null,
				your_piece: req.body.your_piece != undefined ? req.body.your_piece : null,
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
	    		PiecesProvider.find({machine_name: req.body.your_piece}, function(err, docs) {
		    		if (err) {
		    			callback(err, null);
		    		}
		    		else {
		    			callback(null, docs);
		    		}
		    	});
		    },
		    function(docs, callback) {
		    	docs.count(function(err, count) {
		    		if (count != 1) {
    					callback(new Error('Zero or more than one piece found for machine name'), null);
    				}    		
    				else {
    					callback(null, docs);
    				}
    			});
		    },
		    function(docs, callback) {
		    	docs.toArray(function(err, pieces) {

		    		//merge user with piece

			    	var thisPlayer 		= req.user;
			    	thisPlayer.piece 	= pieces[0]

			    	//create players array

			    	var players = [];
			    	for (i = 1; i <= req.body.num_players; i++) {
			    		if (i == 1) {
			    			players.push(thisPlayer);
			    		}
			    		else {
			    			players.push({});
			    		}
			    	}

			    	//create game object

			        var obj = {
			        	num_players: req.body.num_players,
			        	players: players,
			        	started: false
			        };

			        callback(null, obj);
			    });
		    },
		    function(obj, callback) {
		    	GamesProvider.insert(obj, function(err, docs) {
		        	if (err) {
		        		callback(err, null);
		        	}
		        	else {
		        		console.log(docs[0]);
		        		res.redirect('/' + docs[0]._id.toString());
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

exports.game = function(req, res, callback) {
	
}