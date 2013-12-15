var mongoose 	= require('mongoose');
var Tile 		= mongoose.model('Tile');

exports.index = function(req, res, callback) {
	Tile.find({}).sort({position: 1}).exec(function(err, Tiles) {
		if (err) {
			callback(err, null);
		}
		else {
			var bottom 	= Tiles.splice(0, 11).reverse();
	  		var left 	= Tiles.splice(0, 9).reverse();
	  		var top 	= Tiles.splice(0, 11);
	  		var right 	= Tiles.splice(0, 9);

			res.render('index', {				
				title: 'MonopolyJs',
				BottomTiles: bottom,
				LeftTiles: left,
				TopTiles: top,
				RightTiles: right,
				User: req.user
			});
		}
	});
};