var mongoose 	= require('mongoose');
var Tile 		= mongoose.model('Tile');

exports.board = function(req, res, callback) {
	Tile.find({}).sort({position: 1}).exec(function(err, Tiles) {
		if (err) {
			callback(err, null);
		}
		else {
			var bottom 	= Tiles.splice(0, 11).reverse();
	  		var left 	= Tiles.splice(0, 9).reverse();
	  		var top 	= Tiles.splice(0, 11);
	  		var right 	= Tiles.splice(0, 9);

			res.render('partials/board', {				
				title: 'MonopolyJs',
				BottomTiles: bottom,
				LeftTiles: left,
				TopTiles: top,
				RightTiles: right,
				User: req.user
			});
		}
	});
}

exports.title = function(req, res, callback) {
	res.render('partials/title');
};

exports.auth = function(req, res, callback) {
	res.render('partials/auth', {
		User: req.user
	});
};

exports.info = function(req, res, callback) {
	if (req.user) {
		res.render('partials/info');
	}
	else {
		res.send('');
	}
};

exports.games = function(req, res, callback) {
	if (req.user) {
		res.render('partials/games');
	}
	else {
		res.send('');
	}	
};

exports.game = function(req, res, callback) {
	if (req.user) {
		res.render('partials/game');
	}
	else {
		res.send('');
	}
};