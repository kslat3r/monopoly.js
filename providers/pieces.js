var util 		= require('util');
var Provider 	= require('./provider.js').Provider;
var Model 		= require('./../models/piece.js').Model;

exports.Provider = function() {
	Provider.apply(this, ['pieces', Model]);
};

util.inherits(exports.Provider, Provider);