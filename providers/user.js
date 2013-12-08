var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/user.js').Model;

exports.Provider = function() {
	this.collectionName = 'users';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	list: function(callback) {
		this.provider.list(this.collectionName, function(err, docs) {
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

	upsert: function(where, data, callback) {
		if (data._raw) {
			delete data['_raw'];
		}

		if (data._json) {
			delete data['_json'];
		}

		this.provider.upsert(this.collectionName, where, data, function(err, doc) {
			if (err) {
				callback(err, null);
			}
			else {
				callback(null, new Model(doc));
			}
		});
	},

	findById: function(id, callback) {
		this.provider.findById(this.collectionName, id, function(err, doc) {
			if (err) {
				callback(err, null);
			}
			else {
				callback(null, new Model(doc));
			}
		});
	}
};