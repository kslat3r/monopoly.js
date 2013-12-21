var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var TileSchema = new Schema({
	name: {
  		type: String
 	},
 	price: {
 		type: String
 	},
 	colour: {
 		type: String
 	},
 	position: {
 		type: Number
 	},
 	lang: {
 		type: String
 	},
 	type: {
 		type: String
 	},
 	machineName: {
 		type: String
 	}
}, {
	collection: 'tiles' 
});

mongoose.model('Tile', TileSchema);