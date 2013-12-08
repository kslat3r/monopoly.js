var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	this.collectionName = 'users';
	this.Generic 		= new Generic(data);
}