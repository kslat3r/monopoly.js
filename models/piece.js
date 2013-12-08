var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	this.collectionName = 'pieces';
	this.Generic 		= new Generic(data);
}