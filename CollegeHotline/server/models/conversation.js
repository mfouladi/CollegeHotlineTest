var mongoose = require('mongoose');

module.exports = mongoose.model('Conversation',{
	phoneNumber			: Number,
	answered			: Boolean,
	active				: Boolean,
	currentVolunteerID 	: Number,
	messages 			: [
							{
								message 		: String,
								timeStamp		: {type : Date, default: Date.now},
								isVolunteer		: Boolean,
								volunteerID 	: Number,
							}
						]
});