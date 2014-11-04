var mongoose 	= require('mongoose')
var Schema 		= mongoose.Schema
//var Model 		= mongoose.model

var Message = mongoose.model('SMS', new Schema({
	mid				: Number, 
	text			: String,
	timeStamp		: {type : Date, default: Date.now},
	isVolunteer		: {type: Boolean, default: false},
	volunteerID		: Number, 
	hasBeenRead		: {type: Boolean, default: false},
	phoneNumber		: Number,
	active			: {type: Boolean, default: false}
}));

var Conversation = mongoose.model('Conversation', new Schema({
	phoneNumber			: Number,
	answered			: {type: Boolean, default: false},
	active				: {type: Boolean, default: true},
	currentVolunteerID 	: Number,
	messages 			: [Message]
}));

module.exports = {
    Conversation: Conversation
};

//############### Prototype for Parent/Child Models ###############

// var ContactInfo = mongoose.model('ContactInfo', new Schema({
//     // ...
// });

// var Account = mongoose.model('Account', new Schema({
//     // ...
//     contact_info: [ContactInfo]
// });

// module.exports = {
//     SMS: SMS,
//     Conversation: Conversation
// };

