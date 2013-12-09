var util 		= require('util');
var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/tile.js').Model;

exports.Provider = function() {
	Provider.apply(this, ['tiles', Model]);
};

util.inherits(exports.Provider, Provider);