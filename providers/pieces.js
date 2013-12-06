var Provider = require('./provider.js').Provider;

exports.Provider = function() {
	this.collectionName = 'pieces';
	this.provider 		= new Provider();;
};

exports.Provider.prototype = {
	list: function(callback) {
		this.provider.list(this.collectionName, {}, {name: 1}, callback);		
	},

	find: function(data, callback) {
		this.provider.find(this.collectionName, data, callback);		
	},
};