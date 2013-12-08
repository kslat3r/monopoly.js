var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/piece.js').Model;

exports.Provider = function() {
	this.collectionName = 'pieces';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	list: function(callback) {
		this.provider.list(this.collectionName, {}, {name: 1}, function(err, docs) {
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
	},

	find: function(data, callback) {
		this.provider.find(this.collectionName, data, function(err, docs) {
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
	},
};