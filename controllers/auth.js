var config 				= require('../config.js');
var passport 			= require('passport');
var FacebookStrategy 	= require('passport-facebook').Strategy;
var TwitterStrategy		= require('passport-twitter').Strategy;
var mongoose 			= require('mongoose');
var User 				= mongoose.model('User');

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
	  		User.findOneAndUpdate({id: profile.id}, profile, {upsert: true}, function(err, User) {
  				if (err) {
					done(err, null);
				}
				else {
					done(null, User);
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
			User.findOneAndUpdate({id: profile.id}, profile, {upsert: true}, function(err, User) {
  				if (err) {
					done(err, null);
				}
				else {
					done(null, User);
				}
			});
		}
	));

	//session handlers

	passport.serializeUser(function(User, done) {
		done(null, User.get('_id').toString());
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, User) {
			if (err) {
				done(err, null);
			}
			else {
				done(null, User);
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