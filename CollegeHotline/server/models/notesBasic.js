var mongoose = require('mongoose');

var basicNoteSchema = new mongoose.Schema({
	phoneNumber 	: Number,
	studentName		: 
					{
					    first: String,
					    last: String
 				 	},
 	schoolName		: String,
 	currentYear 	: String,
 	studentAddress 	: String, 
 	goals 			: [{
 						body : String,
 						checked: Boolean
 					}],
 	question1		: [{
 						body : String,
 						timeStamp : {type : Date, default: Date.now()}
 					}],
 	question2		: [{
 						body : String,
 						timeStamp : {type : Date, default: Date.now()}
 					}]
});

module.exports = mongoose.model('basicnote', basicNoteSchema);