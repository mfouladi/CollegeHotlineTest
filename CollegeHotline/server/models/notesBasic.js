var mongoose = require('mongoose');

module.exports = mongoose.model('NotesBasic',{
	phoneNumber			: Number,
	studentName			: {first: String, last: String},
	schoolName			: String,
	gpa					: Number,
	graduationDate		: Date
});