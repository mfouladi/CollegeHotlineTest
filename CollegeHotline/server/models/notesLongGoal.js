var mongoose = require('mongoose');

module.exports = mongoose.model('NotesLongGoal',{
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