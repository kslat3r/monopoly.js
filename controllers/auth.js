var config 				= require('../config.js');
var passport 			= require('passport');
var FacebookStrategy 	= require('passport-facebook').Strategy;
var UsersProvider 		= require('../providers/user.js').Provider;
UsersProvider 			= new UsersProvider();

(function() {
	passport.use(
		new FacebookStrategy({
			clientID: config.facebook.app_id, 
			clientSecret: config.facebook.app_secret, 
			callbackURL: config.facebook.callback_url
		}, 
		function(accessToken, refreshToken, profile, done) {
	  		UsersProvider.upsert({id: profile.id}, profile, function(user) {
	  			done(null, user);
	  		});
		}
	));

	passport.serializeUser(function(user, done) {
		done(null, user._id.toString());
	});

	passport.deserializeUser(function(id, done) {
		UsersProvider.findById(id, function(user) {
			done(null, user);
		});
	});
})();

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.passport = passport;