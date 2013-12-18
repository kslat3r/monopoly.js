var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UserSchema = new Schema({
	provider: {
		type: String
	},
	providerId: {
		type: String
	},
	data: {
		type: Object
	}
}, {
	collection: 'users' 
});

mongoose.model('User', UserSchema);