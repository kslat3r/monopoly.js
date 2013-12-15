var moment 		= require('moment');
var mongoose 	= require('mongoose');
var Game 		= mongoose.model('Game');

exports.list = function(req, res, callback) {
	if (req.user) {
        Game.find({_players: req.user.get('_id')}).populate('_players').sort({created_date_microtime: -1}).exec(function(err, Games) {
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
	req.assert('name', 'Name is required').notEmpty();
    req.assert('num_players', 'Number of players is required').notEmpty();
    var errors = req.validationErrors();

    if (!errors) {
                           
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

        Game.create(obj, function(err, Game) {
        	if (err) {
            	callback(err, null);
            }
            else {
            	res.send(Game);
            }
        });                         
    }
    else {
        res.send(errors);        
    }        
};

exports.get = function(req, res, callback) {

}

exports.put = function(req, res, callback) {

};

exports.delete = function(req, res, callback) {

};