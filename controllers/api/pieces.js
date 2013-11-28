var PiecesProvider = require('../../providers/pieces.js').PiecesProvider;
PiecesProvider = new PiecesProvider();

exports.list = function(req, res) {
  res.send(PiecesProvider.list());
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