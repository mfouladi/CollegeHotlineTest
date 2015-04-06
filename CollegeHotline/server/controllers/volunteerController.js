var Volunteer 	= require('../models/volunteer.js');
var availibilityController   = require('./availibilityController');

module.exports.listVolunteers = function(req, res){
	Volunteer.find(req.params).sort({ available: 'desc'}).exec(function (err, volunteer){
		res.json(volunteer);
	});
}

module.exports.logoutVolunteer = function(req, res, next){
	console.log("im not here");
	availibilityController.endConversations(req, res, next);
	availibilityController.userLoggedOff(req, res, next);
	console.log("back at logoutVolunteer");
	req.logout();
	//next();
	res.redirect('/home');
}