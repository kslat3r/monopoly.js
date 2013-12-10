var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UserSchema = new Schema({
	
}, {
	collection: 'users' 
});

mongoose.model('User', UserSchema);