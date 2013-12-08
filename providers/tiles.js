var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/tile.js').Model;

exports.Provider = function() {
	this.collectionName = 'tiles';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	list: function(callback) {
		this.provider.list(this.collectionName, {}, {'position': 1}, function(err, docs) {
			if (err) {
				callback(err, null);
			}
			else {
				var out = [];

				for (var i in docs) {
					out.push(new Model(docs[i]));
				}

				callback(null, out);
			}
		});
	}
};