var mongoose = require('mongoose');

module.exports = mongoose.model('Volunteer',{
	firstName				: String,
	lastName				: String,
	username				: Number, 
	password				: String,
	volunteerID				: Number,
	phoneNumber				: Number,
	email					: String,
	online					: Boolean,
	available				: Boolean,
	numCalls				: Number,
	callHistory				: [{
								firstName	: String,
								lastName 	: String,
								phoneNumber : Number,
							}];
});