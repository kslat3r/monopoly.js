var db = {
	uri: process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/monopolyjs'	
};

var facebook = {
	app_id: process.env.FACEBOOK_APP_ID,
	app_secret: process.env.FACEBOOK_APP_SECRET,
	callback_url: process.env.NODE_ENV == 'production' ? 'http://www.monopolyjs.com/auth/facebook/callback' : 'http://monopolyjs.nll:3000/auth/facebook/callback'
};

var twitter = {
	consumerKey: process.env.TWITTER_CONSUMER_KEY,
	consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
	callbackURL: process.env.NODE_ENV == 'production' ? 'http://www.monopolyjs.com/auth/twitter/callback' : 'http://monopolyjs.nll:3000/auth/twitter/callback'
};

module.exports.db 		= db;
module.exports.facebook = facebook;
module.exports.twitter 	= twitter;