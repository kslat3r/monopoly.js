var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	this.collectionName = 'tiles';
	this.Generic 		= new Generic(data);
}