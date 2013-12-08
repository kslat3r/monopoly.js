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
						callback(err, null);
					}
					else {
						that.db = db;
						callback(null, db);
					}					
				});
			})(this);
		}
		else {
			callback(null, this.db);
		}
	},

	list: function(collectionName, params, sort, callback) {
		this.connect(function(err, db) {
			if (err) {
				callback(err, null);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		callback(err, null);
			    	}
			    	else {
			    		collection.find(params).sort(sort).toArray(function(err, docs) {
			    			if (err) {
			    				callback(err, null);
			    			}
			    			else {
			    				callback(null, docs);
			    			}
			  			});
			    	}
			  	});
			}
		});
	},

	upsert: function(collectionName, where, data, callback) {
		this.connect(function(err, db) {
			if (err) {
				throw new Exception(err);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		callback(err, null);
			    	}
			    	else {
			    		var opts = {
			    			upsert: true, 
			    			new: true,
			    			safe: true
			    		};

			    		collection.findAndModify(where, [['_id','asc']], data, opts, function(err, doc) {
			    			if (err) {
			    				callback(err, null);
			    			}
			    			else {
			    				callback(err, doc);
			    			}
			    		});
			    	}
			    });
			}
		});
	},

	insert: function(collectionName, obj, callback) {
		this.connect(function(err, db) {
			if (err) {
				throw new Exception(err);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		callback(err, null);
			    	}
			    	else {
			    		collection.insert(obj, function(err, docs) {
			    			if (err) {
			    				callback(err, null);
			    			}
			    			else {
		    					callback(err, docs);
			    			}
			    		});
			    	}
			    });
			}
		});
	},

	findById: function(collectionName, id, callback) {
		this.connect(function(err, db) {
			if (err) {
				callback(err, null);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		callback(err, null);
			    	}
			    	else {
			    		collection.findOne({_id: new ObjectID(id)}, function(err, doc) {
			    			if (err) {
			    				callback(err, null);
			    			}
			    			else {			    						    					
		    					callback(null, doc);
				    		}
			    		});
			    	}
			    });
			}
		});
	},

	find: function(collectionName, data, callback) {
		this.connect(function(err, db) {
			if (err) {
				callback(err, null);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		callback(err, null);
			    	}
			    	else {
			    		collection.find(data).toArray(function(err, docs) {
			    			if (err) {
			    				callback(err, null);
			    			}
			    			else {
			    				callback(null, docs);
			    			}
			    		});
			    	}
			    });
			}
		});
	}
}