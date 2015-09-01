var Volunteer 	= require('../models/volunteer.js');
var Conversation 	= require('../models/conversation.js');
var logoutController   = require('./volunteerController');

module.exports.startAvailibilityTimer = function(req, res, next){
	var updateUser = {};
	updateUser.leftPage = true;
	Volunteer.update({ 'username' :  req.user[0].username }, {$set : updateUser}, function(err, result) {
		console.log("availibility timer started");
		if (err)
			throw err;
	});

	var timer = setTimeout(function(){

		Volunteer.find({phoneNumber: req.user[0].phoneNumber}, function(err, results){
			if(results[0].leftPage === true){
				logoutController.logoutVolunteer(req, res, next);
			}
		});
	}, 3000);
}

module.exports.stopAvailibilityTimer = function(req, res, next){
	var updateUser = {};
	updateUser.leftPage = false;
	Volunteer.update({ 'username' :  req.user[0].username }, {$set : updateUser}, function(err, result) {
		console.log("availibility timer set to false");
		if (err)
			throw err;
	});
}

module.exports.endConversations = function(req, res, next){
	console.log("something happened");
	Conversation.update({currentVolunteerID: req.user[0].id}, 
		{$set: {active : false, currentVolunteerID: "none"}},
		{upsert: false, multi: true},
		function (err, conversation){
			console.log("convos are ended");
	});

	next();
}

module.exports.userLoggedOff = function(req, res, next){
	console.log("something else happened");
	var updateUser = {};
	updateUser.online = false;
	updateUser.available = false;

	// save the user
	Volunteer.update({ 'username' :  req.user[0].username }, {$set : updateUser}, function(err, result) {
		console.log("user is logged out");
		if (err)
			throw err;
	});

	next();
}