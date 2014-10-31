var mongoose = require('mongoose');

module.exports = mongoose.model('SMS',{
	mid: Number, 
	message: String,
	uid: Number,
	tid: Number,
	phoneNumber: Number,
	active: Boolean
});