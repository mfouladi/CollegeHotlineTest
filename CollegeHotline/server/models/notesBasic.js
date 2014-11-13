var mongoose = require('mongoose');

var basicNoteSchema = new mongoose.Schema({
	phoneNumber 	: Number,
	studentName		: 
					{
					    first: String,
					    last: String
 				 	},
 	schoolName		: String,
 	gpa				: Number,
 	graduationYear 	: Number
});

module.exports = mongoose.model('basicnote', basicNoteSchema);