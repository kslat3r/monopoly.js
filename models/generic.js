exports.Generic = function(data) {
	this.data = data || {};
};

exports.Generic.prototype = {
	get: function(key) {
		if (key == '_id' && this.data._id !== undefined) {
			return this.data._id.toString();
		}
		else {
			return this.data[key] != undefined ? this.data[key] : null;
		}
	},

	set: function(key, val) {
		return this.data[key] = val;
	},

	toObject: function() {
		return this.data;
	}
};