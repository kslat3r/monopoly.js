var Config		= require('../config.js');
var Db 			= require('mongodb').Db;
var Server		= require('mongodb').Server;
var ObjectID 	= require('mongodb').ObjectID;

exports.Provider = function(collectionName, Model) {
	this.collectionName = collectionName;
	this.Model			= Model;
	this.db 			= null;
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

	list: function(sort, callback) {
		(function(that) {
			that.connect(function(err, db) {
				if (err) {
					callback(err, null);
				}
				else {
					db.collection(that.collectionName, function(err, collection) {
						if (err) {
				    		callback(err, null);
				    	}
				    	else {
				    		collection.find({}).sort(sort).toArray(function(err, docs) {
				    			if (err) {
				    				callback(err, null);
				    			}
				    			else {
			    					if (err) {
			    						callback(err, null);
			    					}	
			    					else {
			    						out = [];

			    						for (var i in docs) {
			    							out.push(new that.Model(docs[i]))
			    						}

			    						callback(null, out);
				    				};				    				
				    			}
				  			});
				    	}
				  	});
				}
			});
		})(this);
	},

	upsert: function(where, data, callback) {
		(function(that) {
			that.connect(function(err, db) {
				if (err) {
					throw new Exception(err);
				}
				else {
					db.collection(that.collectionName, function(err, collection) {
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
				    				callback(err, new that.Model(doc));
				    			}
				    		});
				    	}
				    });
				}
			});
		})(this);
	},

	insert: function(obj, callback) {
		(function(that) {
			that.connect(function(err, db) {
				if (err) {
					throw new Exception(err);
				}
				else {
					db.collection(that.collectionName, function(err, collection) {
				    	if (err) {
				    		callback(err, null);
				    	}
				    	else {
				    		collection.insert(obj, function(err, docs) {
				    			if (err) {
				    				callback(err, null);
				    			}
				    			else {
			    					if (err) {
			    						callback(err, null);
			    					}	
			    					else {
			    						out = [];

			    						for (var i in docs) {
			    							out.push(new that.Model(docs[i]))
			    						}

			    						callback(null, out);
			    					}
				    			}
				    		});
				    	}
				    });
				}
			});
		})(this);
	},

	findById: function(id, callback) {
		(function(that) {
			that.connect(function(err, db) {
				if (err) {
					callback(err, null);
				}
				else {
					db.collection(that.collectionName, function(err, collection) {
				    	if (err) {
				    		callback(err, null);
				    	}
				    	else {
				    		collection.findOne({_id: new ObjectID(id)}, function(err, doc) {
				    			if (err) {
				    				callback(err, null);
				    			}
				    			else {			    						    					
			    					callback(null, new that.Model(doc));
					    		}
				    		});
				    	}
				    });
				}
			});
		})(this);
	},

	find: function(data, callback) {
		(function(that) {
			that.connect(function(err, db) {
				if (err) {
					callback(err, null);
				}
				else {
					db.collection(that.collectionName, function(err, collection) {
				    	if (err) {
				    		callback(err, null);
				    	}
				    	else {
				    		collection.find(data).toArray(function(err, docs) {
				    			if (err) {
				    				callback(err, null);
				    			}
				    			else {
			    					if (err) {
			    						callback(err, null);
			    					}	
			    					else {
			    						out = [];

			    						for (var i in docs) {
			    							out.push(new that.Model(docs[i]))
			    						}

			    						callback(null, out);
				    				}
				    			}
				    		});
				    	}
				    });
				}
			});
		})(this);
	}
}