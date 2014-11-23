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
 	goals 			: [{body : String}],
 	ltgoals			: [{body : String}]
 	/*
	goals			:[
						{
							body : String
							// dateSet : Date,
							// dueDate : Date,
							// dateCompleted: Date
						}
					]
	*/
});

module.exports = mongoose.model('basicnote', basicNoteSchema);