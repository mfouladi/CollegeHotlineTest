var NotesBasic = require('../models/notesBasic');

module.exports.list = function(req, res){
	NotesBasic.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.create = function(req, res){
	var newNote = new NotesBasic(req.body);
	newNote.save(function (err, result){
		res.json(result);
	});
}