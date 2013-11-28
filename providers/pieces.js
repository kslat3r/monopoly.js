var Provider = require('./provider.js').Provider;

exports.PiecesProvider = function() {
	this.collection = 'pieces';
	this.provider 	= new Provider();;
};

exports.PiecesProvider.prototype = {
	list: function() {
		this.provider.db.collection(this.collection, function(error, collection) {
	    	if (error) {
	    		
	    	}
	    	else {
	    		collection.find().toArray(function(err, docs) {
        			return docs;        			
      			});
	    	}
	  	});
	}
};