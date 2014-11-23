var NotesBasic = require('../models/notesBasic.js');

module.exports.list = function(req, res){
	NotesBasic.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.create = function(req, res){
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