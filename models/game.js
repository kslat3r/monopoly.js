var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var GameSchema = new Schema({
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
 	}]
}, {
	collection: 'games' 
});

GameSchema.methods = {
	addUser: function(User, callback) {
		var currentPlayers = this.get('_players');

		for (var i in currentPlayers) {
			if (currentPlayers[i].get('_id').toString() == User.get('_id').toString()) {
				callback(null, this);
				return;
			}
		}

		currentPlayers.push(User.get('_id'));
		this.players = currentPlayers;
		this.save();

		callback(null, this); 
	}
}

mongoose.model('Game', GameSchema);