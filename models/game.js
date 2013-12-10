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
 	_players: [{
 		type: Schema.Types.ObjectId, 
 		ref : 'User'
 	}],
 	created_date: { 
 		type: String
 	},
 	created_date_microtime: {
 		type: Number
 	}
}, {
	collection: 'games'
});

GameSchema.methods = {
	
	addUser: function(User, callback) {
		var currentPlayers = this.get('_players');

		if (currentPlayers.length > 0) {
			for (var i in currentPlayers) {
				if (currentPlayers[i]._id == User.get('_id').toString()) {
					callback(null, this);
					return;
				}
			}
		}
		
		currentPlayers.push(User.get('_id'));
		this.players = currentPlayers;
		this.save();

		callback(null, this); 
	}
}

mongoose.model('Game', GameSchema);