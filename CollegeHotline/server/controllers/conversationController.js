var Message 		= require('../models/message.js');
var Conversation 	= require('../models/conversation.js')
/*
module.exports.createMessage = function(req, res){
	var message = new Message(req.body);
	message.save(function (err, result){
		res.json(result);
	});
}

module.exports.listMessages = function(req, res){
	Message.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.removeMessage = function(req, res){
	Message.find(req.params, function ( err, message ){
	    message[0].remove( function ( err, message ){
	    	res.json(message);
	    });
  	});
}
*/
module.exports.createConversation = function(req, res){
	var conversation = new Conversation();
	//var message = new Message(req.body);
	conversation.messages[0] = {
							text			: req.body.text,
							timeStamp		: Date.now,
							isVolunteer		: false,
							volunteerID		: 0, 
							hasBeenRead		: false,
							phoneNumber		: req.body.phoneNumber,
							active			: false
						  };
  	
	//conversation.messages.push(message);
	//console.log(req.body);
	conversation.phoneNumber = conversation.messages[0].phoneNumber;
	console.log("Received new conversation parameters:\n", req.body, "\n");
	console.log("Created new conversation:\n", conversation, "\n");
	conversation.save(function (err, result){
		console.log(err);
		res.json(result);
		console.log("Added new conversation:\n", result, "\n");
	});
}

module.exports.activateConversation = function(req, res){
	console.log("Activating conversation:\n", req.params, "\n")
	Conversation.update(req.params, {$set: {active : true}}, function (err, result){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

module.exports.deactivateConversation = function(req, res){
	console.log("Deactivating conversation:\n", req.params, "\n")
	Conversation.update(req.params, {$set: {active : false}}, function (err, conversation){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

module.exports.listConversations = function(req, res){
	Conversation.find(req.query, function (err, results){
	//Conversation.find({messages: {"$elemMatch": {phoneNumber: 1234}}}, function (results){
		res.json(results);
		console.log("Found conversations:\n ", results, "\n");
	});
}

module.exports.openConversation = function (req, res){
	Conversation.update(req.params, {$set: {unreadMessageCount : 0}}, function (err, conversation){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}