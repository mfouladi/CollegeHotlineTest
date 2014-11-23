var mongoose 	= require('mongoose')
var Schema 		= mongoose.Schema
var Message 	= require('../models/message.js');

module.exports = mongoose.model('Conversation',{
	phoneNumber				: Number,
	messageCount			: {type: Number, default: 1},
	unreadMessageCount		: {type: Number, default: 1},
	unansweredMessageCount	: {type: Number, default: 1}, 
	answered				: {type: Boolean, default: false},
	active					: {type: Boolean, default: false},
	currentVolunteerID 		: {type: Number, default: 0},
	messages				: [{
								text			: String,
								timeStamp		: {type : Date, default: Date.now()},
								isVolunteer		: {type: Boolean, default: false},
								volunteerID		: Number, 
								hasBeenRead		: {type: Boolean, default: false},
								phoneNumber		: {type: Number, default: 3108675309},//remove default in production
								active			: {type: Boolean, default: false}
						 	  }]
});

//users : [{ type : Mongoose.Schema.ObjectId, ref : 'users' }]