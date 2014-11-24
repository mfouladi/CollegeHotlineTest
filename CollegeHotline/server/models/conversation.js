var mongoose 	= require('mongoose')
var Schema 		= mongoose.Schema
var Message 	= require('../models/message.js');

module.exports = mongoose.model('Conversation',{
	phoneNumber				: Number,
	messageCount			: {type: Number, default: 1},
	unreadMessageCount		: {type: Number, default: 1},
	unansweredMessageCount	: {type: Number, default: 1},
	active					: {type: Boolean, default: false},
	currentVolunteerID 		: {type: String, default: "none"},
	messages				: [{
								text			: String,
								timeStamp		: {type : Date, default: Date.now()},
								isVolunteer		: {type: Boolean, default: false},
								volunteerID		: String,
						 	  }]
});

//users : [{ type : Mongoose.Schema.ObjectId, ref : 'users' }]