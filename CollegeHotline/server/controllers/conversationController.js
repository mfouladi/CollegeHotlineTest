var Message 		= require('../models/message.js');
var Conversation 	= require('../models/conversation.js')


module.exports.createConversation = function(req, res){
	//PATRICK: DO NOT REMOVE THIS... MING
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
								volunteerID		: 0, 
								hasBeenRead		: false,
								phoneNumber		: req.body.phoneNumber,
								active			: false
							 };
			conversation.messages.push(newMessage);
			conversation.phoneNumber = req.body.phoneNumber;
			conversation.save(function (err, result){
				res.json(result);
			});

		}
		else{
			Conversation.update({phoneNumber: req.body.phoneNumber}, 
								{$push: {"messages": 
											{
												text			: req.body.text,
												timeStamp		: Date.now(),
												isVolunteer		: req.body.isVolunteer,
												volunteerID		: 0, 
												hasBeenRead		: false,
												phoneNumber		: req.body.phoneNumber,
												active			: false
											}
										},
								$inc: {messageCount : 1, unreadMessageCount : 1, unansweredMessageCount : 1}
								}, 
								function (err, result){
									res.json(result);
								});
		}
	});
}

module.exports.activateConversation = function(req, res){
	Conversation.update(req.params, {$set: {active : true}}, function (err, result){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

module.exports.deactivateConversation = function(req, res){
	Conversation.update(req.params, {$set: {active : false}}, function (err, conversation){
	});
	Conversation.find(req.params, function (err, conversation){
		res.json(conversation);
	});
}

module.exports.listConversations = function(req, res){
	Conversation.find(req.query, function (err, results){
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