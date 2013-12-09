var util 		= require('util');
var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/user.js').Model;

exports.Provider = function() {
	Provider.apply(this, ['users', Model]);
};

exports.Provider.prototype = {
	upsert: function(where, data, callback) {
		if (data._raw) {
			delete data['_raw'];
		}

		if (data._json) {
			delete data['_json'];
		}

		exports.Provider.super_.prototype.upsert(where, data, callback);
	}
};

util.inherits(exports.Provider, Provider);