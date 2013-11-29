var Config		= require('../config.js');
var Db 			= require('mongodb').Db;
var Server		= require('mongodb').Server;

exports.Provider = function() {
	this.db = null;  	
};

exports.Provider.prototype = {
	connect: function(callback) {
		if (this.db == null) {
			(function(that) {
				Db.connect(Config.db.uri, function(err, db) {
					if (err) {
						console.log(err);
					}
					else {
						that.db = db;
						callback();
					}
				});
			})(this);
		}
		else {
			callback();
		}
	},

	list: function(collectionName, callback) {
		(function(that) {
			that.connect(function() {
				that.db.collection(collectionName, function(error, collection) {
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
			});
		})(this);
	}
}