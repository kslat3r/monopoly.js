var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var PieceSchema = new Schema({
	name: {
  		type: String
 	},
 	image: {
 		type: String
 	},
 	machine_name: {
 		type: String
 	},
}, {
	collection: 'pieces' 
});

mongoose.model('Piece', PieceSchema);