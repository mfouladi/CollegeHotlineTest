var NotesShortTerm = require('../models/notesShortGoal');

module.exports.create = function(req, res){
	var newGoal = new NotesShortTerm(req.body);
	newGoal.save(function (err, result){
		res.json(result);
	});
}