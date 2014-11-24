var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
	text			: String,
	timeStamp		: {type : Date, default: Date.now()},
	isVolunteer		: {type: Boolean, default: false},
	volunteerID		: String,
});