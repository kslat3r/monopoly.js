var config 				= require('../config.js');
var passport 			= require('passport');
var FacebookStrategy 	= require('passport-facebook').Strategy;
var TwitterStrategy		= require('passport-twitter').Strategy;
var UsersProvider 		= require('../providers/user.js').Provider;
UsersProvider 			= new UsersProvider();

//constructor

(function() {

	//facebook

	passport.use(
		new FacebookStrategy({
			clientID: config.facebook.app_id, 
			clientSecret: config.facebook.app_secret, 
			callbackURL: config.facebook.callback_url
		}, 
		function(accessToken, refreshToken, profile, done) {
	  		UsersProvider.upsert({id: profile.id}, profile, function(err, User) {
	  			if (err) {
					done(err, null);
				}
				else {
					done(null, User.toObject());
				}
	  		});
		}
	));

	//twitter

	passport.use(
		new TwitterStrategy({
			consumerKey: config.twitter.consumerKey,
			consumerSecret: config.twitter.consumerSecret,
			callbackURL: config.twitter.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			UsersProvider.upsert({id: profile.id}, profile, function(err, User) {
	  			if (err) {
					done(err, null);
				}
				else {
					done(null, User.toObject());
				}
	  		});
		}
	));

	//session handlers

	passport.serializeUser(function(user, done) {
		done(null, user._id.toString());
	});

	passport.deserializeUser(function(id, done) {
		UsersProvider.findById(id, function(err, User) {
			if (err) {
				done(err, null);
			}
			else {
				done(null, User.toObject());
			}
		});
	});
})();

exports.passport = passport;

exports.facebook = function() {
	return passport.authenticate('facebook', {
		session: true
	});
}

exports.facebookCallback = function() {
	return passport.authenticate('facebook', { 
		successRedirect: '/',
    	failureRedirect: '/' 
	});
}

exports.twitter = function() {
	return passport.authenticate('twitter', {
		session: true
	});
}

exports.twitterCallback = function() {
	return passport.authenticate('twitter', { 
		successRedirect: '/',
    	failureRedirect: '/' 
	});
}

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};