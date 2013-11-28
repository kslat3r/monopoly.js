var Config		= require('../config.js');
var Db 			= require('mongodb').Db;
var Server		= require('mongodb').Server;

exports.Provider = function() {
	this.db = new Db(Config.db.name, new Server(Config.db.host, Config.db.port, {safe: false}, {auto_reconnect: true}, {}));
  	this.db.open(function() {

  	});
};

exports.Provider.prototype = {
	list: function(collectionName, callback) {
		this.db.collection(collectionName, function(error, collection) {
	    	if (error) {
	    		console.log(error);
	    	}
	    	else {
	    		collection.find().toArray(function(error, docs) {
	    			if (error) {
	    				console.log(error);
	    			}
	    			else {
        				callback(docs);
        			}
      			});
	    	}
	  	});
	}
}