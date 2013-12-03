var db = {
	uri: process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/monopolyjs'	
};

var facebook = {
	app_id: process.env.NODE_ENV == 'production' ? '274770006003387' : '597969390251431',
	app_secret: process.env.NODE_ENV == 'production' ? '3498708d12cb968dde2d91a204632890' : '54a6b160db81be26c1fda2bea1638812',
	callback_url: process.env.NODE_ENV == 'production' ? 'http://www.monopolyjs.com/auth/facebook/callback' : 'http://monopolyjs.nll:3000/auth/facebook/callback'
};

module.exports.db = db;
module.exports.facebook = facebook;