var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/game.js').Model;

exports.Provider = function() {
	this.collectionName = 'games';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	insert: function(obj, callback) {
		this.provider.insert(this.collectionName, obj, function(err, docs) {
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