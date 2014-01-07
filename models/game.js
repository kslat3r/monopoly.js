var mongoose 	= require('mongoose');
var moment 		= require('moment');
var Schema 		= mongoose.Schema;
var socketio 	= require('../lib/socketio.js');

//constants

var JAIL_POSITION 		= 11;
var GO_TO_JAIL_POSITION = 31;

var GameSchema = new Schema({
	name: {
		type: String
	},
	started: {
  		type: Boolean,
  		default: false
 	},
 	numPlayers: {
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

 		}],
 		inJail: Boolean
 	}],
 	_playersRef: [{
 		type: Schema.Types.ObjectId, 
 		ref : 'User'
 	}],
 	createdDate: { 
 		type: String
 	},
 	createdDateMicrotime: {
 		type: Number
 	},
 	tiles: [{
 		
 	}],
 	turns: [{
 		roll1: Number,
 		roll2: Number,
 		player: Number,
 		complete: Boolean
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
					numPlayers: req.body.numPlayers,
			        _players: [],
			        started: false,
			        name: req.body.name,
			        createdDate: moment().format('D/M/YY HH:mm'),
			        createdDateMicrotime: (new Date).getTime(),
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
				money: 1500,
				inJail: false
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
	},

	canRollDice: function(User) {

		//has the last turn been completed

		if (this.turns[this.turns.length-1].complete === true) {
			return true;
		}

		return false;
	},

	rollDice: function(User, callback) {

		//get last two turns

		var lastTurn 		= this.turns[this.turns.length - 1];
		var secondLastTurn	= this.turns[this.turns.length - 2];

		//create move

		var turn = {
            roll1: Math.floor((Math.random()*6)+1),
            roll2: Math.floor((Math.random()*6)+1),
            player: this.currentPlayer,
            complete: false
        };

		//add move to history

		this.turns.push(turn);

		//is the player in jail?

		if (this.players[this.currentPlayer].inJail === false) {

			//move player to new position if the last three roles haven't been doubles

			if (turn.roll1 === turn.roll2 && turn.player === this.currentPlayer && lastTurn.roll1 === lastTurn.roll2 && lastTurn.player === this.currentPlayer && secondLastTurn.roll1 === secondLastTurn.roll2 && secondLastTurn.player === this.currentPlayer) {
				var newPosition 						= JAIL_POSITION;
				this.players[this.currentPlayer].inJail = true;
			}
			else {
				var newPosition = this.players[this.currentPlayer].position + turn.roll1 + turn.roll2;
				newPosition 	= newPosition > this.tiles.length ? newPosition - this.tiles.length : newPosition;			
			}

			this.players[this.currentPlayer].position = newPosition;

			//has the player landed on go to jail?

			if (this.players[this.currentPlayer].position === GO_TO_JAIL_POSITION) {

				//send to jail

				this.players[this.currentPlayer].position 	= JAIL_POSITION;
				this.players[this.currentPlayer].inJail		= true;
			}
		}
		else {

		}

		//save

		var self = this;
		this.save(function(err) {
			callback(err, self);
		});
	},

	endTurn: function(callback) {

		//update last move

		this.turns[this.turns.length-1].complete = true;

		//move to next player if roll was not a double or last player has been sent to jail

		if (this.turns[this.turns.length-1].roll1 !== this.turns[this.turns.length-1].roll2 || this.players[this.currentPlayer].inJail === true) {
			this.currentPlayer++;
			this.currentPlayer = this.currentPlayer > (this.numPlayers - 1) ? 0 : this.currentPlayer;
		}

		//save

		var self = this;
		this.save(function(err) {
			callback(err, self);
		});
	},

	addClient: function(client) {
		client.join(this._id);
	},

	updateClients: function() {
		socketio.instance().sockets.in(this._id).emit('game:update', this);
	},

	removeClient: function(socket) {
		client.leave(this._id);
	}
};

mongoose.model('Game', GameSchema);