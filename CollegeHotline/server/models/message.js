var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
	mid				: Number, 
	text			: String,
	timeStamp		: {type : Date, default: Date.now},
	isVolunteer		: {type: Boolean, default: false},
	volunteerID		: Number, 
	hasBeenRead		: {type: Boolean, default: false},
	phoneNumber		: {type: Number, default: 3108675309},//remove default in production
	active			: {type: Boolean, default: false}
});