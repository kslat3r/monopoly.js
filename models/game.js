var mongoose 	= require('mongoose');
var moment 		= require('moment');
var Schema 		= mongoose.Schema;

var GameSchema = new Schema({
	name: {
		type: String
	},
	started: {
  		type: Boolean,
  		default: false
 	},
 	num_players: {
 		type: Number
 	},
 	players: [{
 		userId: String,
 		name: String,
 		friendlyName: String,
 		avatarUrl: String,
 		position: Number,
 		money: Number,
 		properties: [{

 		}],
 		goojf: [{

 		}]
 	}],
 	_playersRef: [{
 		type: Schema.Types.ObjectId, 
 		ref : 'User'
 	}],
 	created_date: { 
 		type: String
 	},
 	created_date_microtime: {
 		type: Number
 	},
 	tiles: [{
 		
 	}],
 	moves: [{
 		
 	}],
 	currentPlayer: {
 		type: Number
 	}
}, {
	collection: 'games'
});


GameSchema.statics = {
	
	letsGo: function(req, callback) {
		var self = this;

		mongoose.model('Tile').find({}).sort({position: 1}).exec(function(err, Tiles) {
			if (err) {
				callback(err, null);
			}
			else {
				var obj = {
					num_players: req.body.num_players,
			        _players: [],
			        started: false,
			        name: req.body.name,
			        created_date: moment().format('D/M/YY HH:mm'),
			        created_date_microtime: (new Date).getTime(),
			        tiles: Tiles,
			        currentPlayer: 0
			    };

		        self.create(obj, function(err, Game) {
		        	if (err) {
		            	callback(err, null);
		            }
		            else {
		            	callback(null, Game);
		            }
		        });
			}
		});
	}
};


GameSchema.methods = {
	
	checkPlayerExists: function(User) {
		if (this.players.length > 0) {
			for (var i in this.players) {
				if (this.players[i].userId == User.get('_id').toString()) {
					return true;
				}
			}
		}

		return false;
	},

	addOnlyNewPlayer: function(User, callback) {
		if (!this.checkPlayerExists(User)) {		
		
			//use get - User has been lazy loaded by reference

			var currentPlayers 	= this.get('players');
			var _playersRef 	= this.get('_playersRef');

			//create new object

			var newPlayer = {
				userId: User._id.toString(),
				position: 1,
				money: 1500
			};

			//switch on provider

			if (User.get('provider') == 'twitter') {
				newPlayer.name 			= User.get('data').displayName;
				newPlayer.friendlyName	= User.get('data').displayName.split(' ')[0];

				var photos			= User.get('data').photos;
				newPlayer.avatarUrl	= photos[0].value;			
			}
			else if (User.get('provider') == 'facebook') {
				newPlayer.name 			= User.get('data').displayName;
				newPlayer.friendlyName	= User.get('data').name.givenName;
				newPlayer.avatarUrl		= 'http://graph.facebook.com/' + User.get('data').username + '/picture?type=square';
			}

			//set on model

			currentPlayers.push(newPlayer);
			_playersRef.push(User._id.toString());

			this.players 		= currentPlayers;
			this._playersRef	= _playersRef;

			//save and callback

			var self = this;
			this.save(function(err) {
				if (err) {
					callback(err, null);
				}
				else {
					callback(null, self);
				}
			});			
		}
		else {
			callback(null, this);
		}
	}
};

mongoose.model('Game', GameSchema);