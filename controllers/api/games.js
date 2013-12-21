var async       = require('async');
var mongoose 	= require('mongoose');
var Game 		= mongoose.model('Game');

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

exports.post = function(req, res, callback) {
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

exports.get = function(req, res, callback) {
    async.waterfall([
        function(callback) {

            //attempt to find game if user logged in

            if (req.user) {
                Game.findOne({_id: req.params.id}).exec(function(err, Game) {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        if (Game === null) {
                            res.send({});
                        }
                        else {
                            callback(null, Game);
                        }
                    }
                });
            }
            else {
                res.send({});
            }
        },
        function(Game, callback) {

            //does this player need adding to the game?

            if (Game.numPlayers !== Game.players.length) {
                Game.addOnlyNewPlayer(req.user, function(err, Game) {
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
}

exports.put = function(req, res, callback) {

};

exports.delete = function(req, res, callback) {

};