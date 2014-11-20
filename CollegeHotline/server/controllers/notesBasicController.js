var NotesBasic = require('../models/notesBasic.js');

module.exports.list = function(req, res){
	console.log("notes.list");
	NotesBasic.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.create = function(req, res){
	console.log("notes.create");
	/*
	NotesBasic.update(req.params, {$set: {schoolName : req.schoolName, studentName : {req.studentName, req.studentName}, schoolName : req.schoolName, gpa : req.gpa, graduationYear : req.graduationYear}}, function (err, results){		
	});

	newNote.save(function (err, result){
		res.json(result);
	});
*/
	
	//var newNote = new NotesBasic(req.body);
	var newNote = new NotesBasic();
	console.log(req.body);
		
	newNote.phoneNumber = req.body.phoneNumber;
	newNote.studentName = req.body.studentName;
	newNote.schoolName = req.body.schoolName;
	newNote.currentYear = req.body.currentYear;
	
	newNote.save(function (err, result){
		res.json(result);
	});
}

module.exports.update = function(req, res){
	NotesBasic.update(
			{phoneNumber : req.body.phoneNumber},
			{$set: 
					{studentName : req.body.studentName, 
					schoolName : req.body.schoolName, 
					currentYear : req.body.currentYear
					} 
			},
			function (err, results)
			{
				res.json(results);
			}
	);
}