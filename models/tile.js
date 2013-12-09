var util 	= require('util');
var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	Generic.apply(this, ['tiles', data]);
}

util.inherits(exports.Model, Generic);