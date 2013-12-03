var Config		= require('../config.js');
var Db 			= require('mongodb').Db;
var Server		= require('mongodb').Server;
var ObjectID 	= require('mongodb').ObjectID;

exports.Provider = function() {
	this.db = null;  	
};

exports.Provider.prototype = {
	connect: function(callback) {
		if (this.db == null) {
			(function(that) {
				Db.connect(Config.db.uri, function(err, db) {
					if (err) {
						
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

	list: function(collectionName, params, sort, callback) {
		(function(that) {
			that.connect(function() {
				that.db.collection(collectionName, function(error, collection) {
			    	if (error) {
			    		
			    	}
			    	else {
			    		collection.find(params).sort(sort).toArray(function(error, docs) {
			    			if (error) {
			    				
			    			}
			    			else {
			    				callback(docs);
			    			}
			  			});
			    	}
			  	});	
			});
		})(this);
	},

	upsert: function(collectionName, where, data, callback) {
		(function(that) {
			that.connect(function() {
				that.db.collection(collectionName, function(error, collection) {
			    	if (error) {
			    		console.log(error);
			    	}
			    	else {
			    		var opts = {
			    			upsert: true, 
			    			new: true,
			    			safe: true
			    		};

			    		collection.findAndModify(where, [['_id','asc']], data, opts, function(error, doc) {
			    			if (error) {
			    				
			    			}
			    			else {
			    				callback(doc);
			    			}
			    		});
			    	}
			    });
			});
		})(this);
	},

	findById: function(collectionName, id, callback) {
		(function(that) {
			that.connect(function() {
				that.db.collection(collectionName, function(error, collection) {
			    	if (error) {
			    		
			    	}
			    	else {
			    		collection.findOne({_id: new ObjectID(id)}, function(error, doc) {
			    			if (error) {
			    				
			    			}
			    			else {			    						    					
		    					callback(doc);
				    		}
			    		});
			    	}
			    });
			});
		})(this);
	},

	find: function(collectionName, data, callback) {
		(function(that) {
			that.connect(function() {
				that.db.collection(collectionName, function(error, collection) {
			    	if (error) {
			    		
			    	}
			    	else {
			    		collection.find(data, function(err, docs) {
			    			if (err) {
			    				
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