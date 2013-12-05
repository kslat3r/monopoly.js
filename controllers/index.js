var TilesProvider = require('../providers/tiles.js').Provider;
TilesProvider = new TilesProvider();
var PiecesProvider = require('../providers/pieces.js').Provider;
PiecesProvider = new PiecesProvider();

exports.index = function(req, res, callback) {
	var docs = TilesProvider.list(function(err, tiles) {
		if (err) {
  			callback(err, null);
  		}
  		else {
			var pieces = PiecesProvider.list(function(err, pieces) {
		  		if (err) {
		  			callback(err, null);
		  		}
		  		else {
			  		var bottom 	= tiles.splice(0, 11).reverse();
			  		var left 	= tiles.splice(0, 9).reverse();
			  		var top 	= tiles.splice(0, 11);
			  		var right 	= tiles.splice(0, 9);

					res.render('index', {
						title: 'MonopolyJs',
						bottomTiles: bottom,
						leftTiles: left,
						topTiles: top,
						rightTiles: right,
						user: req.user,
						pieces: pieces
					});
				}
			});
		}
	});
};

exports.createGame = function(req, res, callback) {
	res.send(req.body);
}

exports.game = function(req, res, callback) {
	
}