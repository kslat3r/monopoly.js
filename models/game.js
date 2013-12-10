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
 	players: [{
 		type: Schema.ObjectId, 
 		ref : 'User'
 	}]
}, {
	collection: 'games' 
});

GameSchema.methods = {
	addUser: function(User, callback) {
		var currentPlayers = this.get('players');

		for (var i in currentPlayers) {
			if (currentPlayers[i] == User.get('_id').toString()) {
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