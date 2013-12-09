var util 	= require('util');
var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	Generic.apply(this, ['games', data]);
}

util.inherits(exports.Model, Generic);