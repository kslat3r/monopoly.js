var Provider = require('../../providers/pieces.js').Provider;
Provider = new Provider();

exports.list = function(req, res) {
	var docs = Provider.list(function(docs) {
		res.send(docs)
	});  
};

exports.get = function(req, res) {
	res.send("Pieces get");
};

exports.create = function(req, res) {
	res.send("Pieces create");
}

exports.delete = function(req, res) {
	res.send("Pieces delete");
}

exports.update = function(req, res) {
	res.send("Pieces update");
}