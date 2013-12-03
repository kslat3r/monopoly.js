var Provider = require('./provider.js').Provider;

exports.Provider = function() {
	this.collectionName = 'users';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	list: function(callback) {
		this.provider.list(this.collectionName, callback);		
	},

	upsert: function(where, data, callback) {
		if (data._raw) {
			delete data['_raw'];
		}

		if (data._json) {
			delete data['_json'];
		}

		this.provider.upsert(this.collectionName, where, data, callback);
	},

	findById: function(id, callback) {
		this.provider.findById(this.collectionName, id, callback);
	}
};