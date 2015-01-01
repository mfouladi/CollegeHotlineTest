/*
 * Serve content over a socket
 */

var Volunteer 	= require('../models/volunteer.js')
var Conversation 	= require('../models/conversation.js')

module.exports = function (socket, req, res ) {
	var volunteerList = [];
	var activeConversationList = [];
	var inactiveConversationList = [];
	// setInterval(function () {
	// 	Volunteer.find({}, function (err, results){
	// 		volunteerList = results;
	// 	});

	// 	socket.emit('send:volunteers', {
	// 		volunteers: volunteerList
	// 	});

	// 	Conversation.find({$and: [{active: false}, {unansweredMessageCount : {$gt: 0}}]}, function (err, results){
	// 		inactiveConversationList = results;
	// 		console.log(results);
	// 	});

	// 	socket.emit('send:inactiveConversations', {
	// 		inactiveConversations: inactiveConversationList
	// 	});
	// }, 1000);
};