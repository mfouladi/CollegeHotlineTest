var NotesBasic = require('../models/notesBasic.js');
var Volunteer = require('../models/volunteer.js');

module.exports.list = function(req, res){
	NotesBasic.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.create = function(req, res){
	var newNote = new NotesBasic();
		
	newNote.phoneNumber = req.body.phoneNumber;
	newNote.studentName = req.body.studentName;
	newNote.schoolName = req.body.schoolName;
	newNote.currentYear = req.body.currentYear;
	newNote.studentAddress = req.body.studentAddress;
	
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
					studentAddress : req.body.studentAddress
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
						goals : {body : req.body.goals, checked: req.body.checked}
					} 
			},
			function (err, results)
			{
				res.json(results);
			}
	);
}

module.exports.saveQuestion1 = function(req, res){
	NotesBasic.update(
			{phoneNumber : req.body.phoneNumber}, 
			{$push: 
					{
						question1 : {body : req.body.question1}
					} 
			},
			function (err, results)
			{
				res.json(results);
			}
	);
}

module.exports.saveQuestion2 = function(req, res){
	NotesBasic.update(
			{phoneNumber : req.body.phoneNumber}, 
			{$push: 
					{
						question2 : {body : req.body.question2}
					} 
			},
			function (err, results)
			{
				res.json(results);
			}
	);
}

module.exports.load = function(req, res){
	Volunteer.find({phoneNumber: req.user[0].phoneNumber}, function(err, results){
		res.json(results);
	})
}