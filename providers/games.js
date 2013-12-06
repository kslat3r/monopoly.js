var Provider = require('./provider.js').Provider;

exports.Provider = function() {
	this.collectionName = 'games';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	insert: function(obj, callback) {
		this.provider.insert(this.collectionName, obj, callback);
	}
};