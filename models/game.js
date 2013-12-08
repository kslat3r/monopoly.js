var Generic = require('./generic.js').Generic;

exports.Model = function(data) {
	this.collectionName = 'games';
	this.Generic 		= new Generic(data);
}