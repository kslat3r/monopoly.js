var Provider = require('./provider.js').Provider;

exports.Provider = function() {
	this.collectionName = 'tiles';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	list: function(callback) {
		this.provider.list(this.collectionName, callback);		
	}
};