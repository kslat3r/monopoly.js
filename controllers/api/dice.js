var async       = require('async');
var mongoose 	= require('mongoose');
var Game 		= mongoose.model('Game');
var socketio 	= require('../../lib/socketio.js');

exports.get = function(req, res, callback) {
	var errors = [];

	if (req.user) {
		var roll = [
			Math.floor((Math.random()*6)+1),
			Math.floor((Math.random()*6)+1)
		];

		if (req.query.gameId) {
			Game.findOne({_id: req.query.gameId}).exec(function(err, Game) {
                if (err) {
                    callback(err, null);
                }
                else {
                    if (Game === null) {
                        errors.push({
							param: 'gameId',
							msg: 'Game object not found'
						});

						res.send({errors: errors});
                    }
                    else {
                    	if (Game.players[Game.currentPlayer].userId != req.user._id) {
                        	errors.push({
								param: 'gameId',
								msg: 'Not this user\'s turn'
							});

							res.send({errors: errors});
                        }
                        else {
                            Game.rollDice(req.user, roll, function(err, Game) {
                            	if (err) {
                            		callback(err, null);
                            	}
                            	else {
                            		Game.endTurn(function(err, Game) {
                            			if (err) {
                            				callback(err, null);
                            			}
                            			else {
                            				socketio.instance().sockets.emit('game:update', Game);
                            				res.send(roll);
                            			}
                            		});                            		
                            	}
                            });
                        }
                    }
                }
            });
		}
		else {
			errors.push({
				param: 'gameId',
				msg: 'Game Id not specified'
			});

			res.send({errors: errors});
		}
	}
	else {		
		errors.push({
			param: 'user',
			msg: 'Valid user session is required'
		});

		res.send({errors: errors});
	}
};
