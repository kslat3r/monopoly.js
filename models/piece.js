var util 	= require('util');
var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	Generic.apply(this, ['pieces', data]);
}

util.inherits(exports.Model, Generic);