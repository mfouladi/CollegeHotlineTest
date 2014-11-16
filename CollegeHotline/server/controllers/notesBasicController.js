var NotesBasic = require('../models/notesBasic');

module.exports.list = function(req, res){
	console.log("notes.list");
	NotesBasic.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.create = function(req, res){
	console.log("notes.create");
	//var newNote = new NotesBasic(req.body);
	var newNote = new NotesBasic();
	console.log(newNote);
	newNote.phoneNumber = "1234567890";
	newNote.studentName = { first: "Jesus", last: "Christ"};
	newNote.schoolName = "Jerusalem Independance High"
	newNote.gpa = "4.0";
	newNote.graduationYear = "0";
	newNote.save(function (err, result){
		res.json(result);
	});
}