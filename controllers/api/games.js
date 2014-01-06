var async       = require('async');
var mongoose 	= require('mongoose');
var Game 		= mongoose.model('Game');
var User        = mongoose.model('User');

var testForSession = function(req, errors) {
	errors = errors || [];

	if (req.user === undefined) {
		errors.push({
			param: 'user',
			msg: 'Valid user session is required'
		});
	}

	return errors.length ? errors : null;
}

exports.list = function(req, res, callback) {
	if (req.user) {
        Game.find({_playersRef: req.user.get('_id')}).populate('_playersRef').sort({created_date_microtime: -1}).exec(function(err, Games) {
    		if (err) {
    			callback(err, null);
    		}
    		else {
    			res.send(Games);
    		}
    	});
    }
    else {
    	res.send([]);
    }
};

exports.create = function(req, res, callback) {
    async.waterfall([
        function(callback) {
            var errors = testForSession(req);

            if (errors === null) {
                callback(null, null);
            }
            else {
                res.send({errors: errors});
            }
        },
        function(v, callback) {

            //check post for errors

        	req.assert('name', 'Name is required').notEmpty();
            req.assert('numPlayers', 'Number of players is required').notEmpty();
            
            var errors 	= req.validationErrors();
            errors 		= testForSession(req, errors);

            if (!errors) {                                   
        	    Game.letsGo(req, function(err, Game) {
                	if (err) {
                    	callback(err, null);
                    }
                    else {
                    	callback(null, Game);
                    }
                });                         
            }
            else {
                res.send({errors: errors});
            }
        },
        function(Game, callback) {

            //add current user to game

            Game.addOnlyNewPlayer(req.user, function(err, Game) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, Game);
                }
            });
        }
    ],
    function(err, Game) {
        if (err) {
            callback(err, null);
        }
        else {
            res.send(Game);
        }
    });
};

exports.get = function(data, client, outputFn) {
    async.waterfall([
        function(callback) {

            //attempt to find user from id

            if (data.userId) {
                User.findOne({_id: data.userId}).exec(function(err, User) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        callback(null, User);
                    }
                });
            }
            else {
                callback([{
                    param: 'userId',
                    msg: 'userId is a required parameter'
                }], null);
            }
        },
        function(User, callback) {

            //attempt to find game if user logged in

            Game.findOne({_id: data.gameId}).exec(function(err, Game) {
                if (err) {
                    callback(err, null);
                }
                else {
                    if (Game === null) {
                        callback({});
                    }
                    else {
                        callback(null, Game, User);
                    }
                }
            });
        },
        function(Game, User, callback) {

            //does this player need adding to the game?

            if (Game.numPlayers !== Game.players.length) {
                Game.addOnlyNewPlayer(User, function(err, Game) {
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
        },
        function(Game, callback) {

            //has the game now started?

            if (Game.numPlayers === Game.players.length && Game.started == false) {
                Game.started = true;

                Game.save(function(err) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        callback(null, Game);
                    }
                })
            }
            else {
                callback(null, Game);
            }
        },
        function(Game, callback) {

            //add the current socket and update all connected sockets

            Game.addClient(client);
            Game.updateClients();

            callback(null, Game);
        }        
    ], 
    function(err, Game) {
        if (err) {
            outputFn(err);
        }
        else {
            outputFn(Game);
        }
    });
};

exports.update = function(req, res, callback) {

};

exports.delete = function(req, res, callback) {

};

exports.rollDice = function(req, res, callback) {
    var errors = [];

    //is the user logged in

    if (req.user) {

        //create the roll

        var roll = [
            Math.floor((Math.random()*6)+1),
            Math.floor((Math.random()*6)+1)
        ];

        if (req.params.id) {

            //get game

            Game.findOne({_id: req.params.id}).exec(function(err, Game) {
                if (err) {
                    callback(err, null);
                }
                else {

                    //has the game been found

                    if (Game === null) {
                        errors.push({
                            param: 'id',
                            msg: 'Game object not found'
                        });

                        res.send({errors: errors});
                    }
                    else {

                        //check the users turn

                        if (Game.players[Game.currentPlayer].userId != req.user._id) {
                            errors.push({
                                param: 'id',
                                msg: 'Not this user\'s turn'
                            });

                            res.send({errors: errors});
                        }
                        else {

                            //roll the dice

                            Game.rollDice(req.user, roll, function(err, Game) {
                                if (err) {
                                    callback(err, null);
                                }
                                else {
                                    res.send(roll);
                                }
                            });
                        }
                    }
                }
            });
        }
        else {
            errors.push({
                param: 'id',
                msg: 'ID not specified'
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

exports.endTurn = function(req, res, callback) {
    var errors = [];

    //is the user logged in

    if (req.user) {

        //find game

        Game.findOne({_id: req.params.id}).exec(function(err, Game) {
            if (err) {
                callback(err, null);
            }
            else {

                //has game been found

                if (Game !== null) {

                    //end the current turn

                    Game.endTurn(function(err, Game) {
                        if (err) {
                            callback(err, null);
                        }
                        else {

                            //move to the previous user if they have rolled a double

                            Game.hasLastUserThrownADouble(function(err, Game) {
                                if (err) {
                                    callback(err, null);
                                }
                                else {
                                    res.send(Game);
                                    Game.updateClients();
                                }
                            });                        
                        }
                    });
                }
                else {
                    callback([{
                        param: 'id',
                        msg: 'Game could not be found'
                    }], null);
                }
            }
        });
    }
    else {
        errors.push({
            param: 'user',
            msg: 'Valid user session is required'
        });

        res.send({errors: errors});
    }
}