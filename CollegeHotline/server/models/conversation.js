var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('Conversation',{
	phoneNumber				: Number,
	messageCount			: {type: Number, default: 1},
	unreadMessageCount		: {type: Number, default: 1},
	unansweredMessageCount	: {type: Number, default: 1},
	active					: {type: Boolean, default: false},
	currentVolunteerID 		: {type: String, default: "none"},
	messages				: [{
								text			: String,
								timeStamp		: {type : Date, default: Date()},
								timeStampString : String,
								isVolunteer		: {type: Boolean, default: false},
								volunteerID		: String,
								volunteerName	: String
						 	  }]
});