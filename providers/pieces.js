var Provider = require('./provider.js').Provider;

exports.PiecesProvider = function() {
	this.collection = 'pieces';
	this.provider 	= Provider;
};

exports.PiecesProvider.prototype = {
	list: function() {
		this.provider.db.collection(this.collection, function(error, collection) {
	    	if (error) {

	    	}
	    	else {
	    		return collection;
	    	}
	  	});
	}
};