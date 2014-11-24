var Message 		= require('../models/message.js');
var Conversation 	= require('../models/conversation.js')


module.exports.createConversation = function(req, res){
	//PATRICK: DO NOT REMOVE THIS... MING
	console.log(req.user);
	console.log(req.body);
	if (req.body.From){
		req.body.phoneNumber = req.body.From;
	}
	if (req.body.Text){
		req.body.text = req.body.Text;		
	}
	Conversation.find({phoneNumber: req.body.phoneNumber}, function (err, result){
		if(result.length == 0){

			var conversation = new Conversation();
			var newMessage = {
								text			: req.body.text,
								timeStamp		: Date.now(),
								isVolunteer		: false,
								volunteerID		: "none",
							 };
			conversation.messages.push(newMessage);
			conversation.phoneNumber = req.body.phoneNumber;
			conversation.save(function (err, result){
				res.json(result);
			});
		}

		else{
			if(!req.body.isVolunteer){
				Conversation.update({phoneNumber: req.body.phoneNumber}, 
									{$push: {"messages": 
												{
													text			: req.body.text,
													timeStamp		: Date.now(),
													isVolunteer		: false,
													volunteerID		: "none",
												}
											},
									$inc: {messageCount : 1, unreadMessageCount : 1, unansweredMessageCount : 1}
									}, 
									function (err, result){
										res.json(result);
									});
			}
			else{
				Conversation.update({phoneNumber: req.body.phoneNumber}, 
									{$push: {"messages": 
												{
													text			: req.body.text,
													timeStamp		: Date.now(),
													isVolunteer		: true,
													volunteerID		: req.user[0].id,
												}
											},
									$inc: {messageCount : 1},
									$set: {unansweredMessageCount: 0, unreadMessageCount: 0}
									}, 
									function (err, result){
										res.json(result);
									});
			}
		}
	});
}

module.exports.activateConversation = function(req, res){
	//console.log(req.user);
	Conversation.update(req.params, {$set: {active : true, currentVolunteerID: req.user[0].id}}, function (err, result){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

module.exports.deactivateConversation = function(req, res){
	Conversation.update(req.params, {$set: {active : false, currentVolunteerID: "none"}}, function (err, conversation){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

module.exports.listInactiveConversations = function(req, res){
	Conversation.find({$and: [{active: false}, {unansweredMessageCount : {$gt: 0}}]}, function (err, results){
		res.json(results);
	});
}

module.exports.listActiveConversations = function(req, res){
	//console.log(req.user);
	Conversation.find({currentVolunteerID: req.user[0].id}, function (err, results){
		res.json(results);
	});
}


module.exports.openConversation = function (req, res){
	Conversation.update(req.params, {$set: {unreadMessageCount : 0}}, function (err, conversation){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

//Old Create Conversation
// module.exports.createConversation = function(req, res){
// 	var conversation = new Conversation();
// 	console.log("Received New Message:\n", req.body, "\n");
// 	var newMessage = {
// 						text			: req.body.text,
// 						timeStamp		: Date.now(),
// 						isVolunteer		: false,
// 						volunteerID		: 0, 
// 						hasBeenRead		: false,
// 						phoneNumber		: req.body.phoneNumber,
// 						active			: false
// 					 };
// 	conversation.messages.push(newMessage);
// 	conversation.phoneNumber = req.body.phoneNumber
// 	conversation.save(function (err, result){
// 		console.log(err);
// 		res.json(result);
// 		console.log("Added new conversation:\n", result, "\n");
// 	});
// }