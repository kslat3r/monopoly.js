var db = {
	uri: process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/monopolyjs'	
};

module.exports.db = db;