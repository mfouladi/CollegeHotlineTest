var NotesBasic = require('../models/notesBasic.js');
var Volunteer = require('../models/volunteer.js');

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
					currentYear : req.body.currentYear,
					} 
			},
			function (err, results)
			{
				res.json(results);
			}
	);
}

module.exports.updateShortGoals = function(req, res){
	NotesBasic.update(
			{phoneNumber : req.body.phoneNumber}, 
			{$push: 
					{
						goals : {body : req.body.goals}
					} 
			},
			function (err, results)
			{
				console.log(req.body);
				res.json(results);
			}
	);
}

module.exports.updateLongGoals = function(req, res){
	NotesBasic.update(
			{phoneNumber : req.body.phoneNumber}, 
			{$push: 
					{
						ltgoals : {body : req.body.ltgoals}
					} 
			},
			function (err, results)
			{
				console.log(req.body);
				res.json(results);
			}
	);
}

module.exports.load = function(req, res){
	console.log(req.user);
	Volunteer.find({phoneNumber: req.user[0].phoneNumber}, function(err, results){
		res.json(results);
	})
}