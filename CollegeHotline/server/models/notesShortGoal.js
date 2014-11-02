var mongoose = require('mongoose');

module.exports = mongoose.model('NotesShortGoal',{
	phoneNumber			: Number,
	goals				:[
							{
								body : String,
								dateSet : Date,
								dueDate : Date,
								dateCompleted: Date
							}
						]
});