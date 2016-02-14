/*jshint strict: true, node: true, unused: false */
"use strict";

var Volunteer = require('../models/volunteer.js');
var Conversation = require('../models/conversation.js');

module.exports.listVolunteers = function (req, res) {
	//Projections used to exclude non relevant data
	var projections = {
		firstName: true,
		lastName: true,
		online: true,
		available: true
	};
	Volunteer.find(req.params, projections).sort({
		available: 'desc'
	}).exec(function (err, volunteer) {
		res.json(volunteer);
	});
};

module.exports.logoutVolunteer = function (req, res, next) {
	console.log("im not here");
	endConversations(req.user[0].id);
	userLoggedOff(req.user[0].username);
	req.logout();
	res.redirect('/');
};

function endConversations(vid) {
	console.log("something happened");
	Conversation.update({
			currentVolunteerID: vid
		}, {
			$set: {
				active: false,
				currentVolunteerID: "none"
			}
		}, {
			upsert: false,
			multi: true
		},
		function (err, conversation) {
			console.log("convos are ended");
		});
}

function userLoggedOff(username) {
	console.log("something else happened");
	var updateUser = {};
	updateUser.online = false;
	updateUser.available = false;

	// save the user
	Volunteer.update({
		'username': username
	}, {
		$set: updateUser
	}, function (err, result) {
		console.log("user is logged out");
		if (err)
			throw err;
	});
}