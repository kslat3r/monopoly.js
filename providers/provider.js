var Config		= require('../config.js');
var Db 			= require('mongodb').Db;
var Server		= require('mongodb').Server;

exports.Provider = function() {
  this.db = new Db(Config.db.name, new Server(Config.db.host, Config.db.port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function() {

  });
};