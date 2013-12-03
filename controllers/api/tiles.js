var Provider = require('../../providers/tiles.js').Provider;
Provider = new Provider();

exports.list = function(req, res) {
  var docs = Provider.list(function(err, docs) {
  		if (err) {
  			console.log(err);
  		}
  		else {
			res.send(docs);
  		}
	});
};

exports.get = function(req, res) {
  res.send("Properties get");
};

exports.create = function(req, res) {
  res.send("Properties create");
}

exports.delete = function(req, res) {
  res.send("Properties delete");
}

exports.update = function(req, res) {
  res.send("Properties update");
}