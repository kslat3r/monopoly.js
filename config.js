var db = {
	uri: process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/monopolyjs'	
};

var facebook = {
	//app_id: process.env.NODE_ENV == 'production' ? '274770006003387' : '597969390251431',
	//app_secret: process.env.NODE_ENV == 'production' ? '3498708d12cb968dde2d91a204632890' : '54a6b160db81be26c1fda2bea1638812',
	app_id: process.env.FACEBOOK_APP_ID,
	app_secret: process.env.FACEBOOK_APP_SECRET,
	callback_url: process.env.NODE_ENV == 'production' ? 'http://www.monopolyjs.com/auth/facebook/callback' : 'http://monopolyjs.nll:3000/auth/facebook/callback'
};

var twitter = {
	//consumerKey: process.env.NODE_ENV == 'production' ? 'UWVGydtdP31urWJDP0ej1g' : '9r0gFcxsQw7OakfeKXlCxA',
	//consumerSecret: process.env.NODE_ENV == 'production' ? 'X3ZpLULSLR4AEjiuNdX1jlYqa4KYkVK9sK8TVPpSQ0' : 'WQU3gUaZo5neHgmP2Fgdn152yqg2rCZiqvkg1827I',
	consumerKey: process.env.TWITTER_CONSUMER_KEY,
	consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
	callbackURL: process.env.NODE_ENV == 'production' ? 'http://www.monopolyjs.com/auth/twitter/callback' : 'http://monopolyjs.nll:3000/auth/twitter/callback'
};

module.exports.db 		= db;
module.exports.facebook = facebook;
module.exports.twitter 	= twitter;