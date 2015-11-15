var Conversation 	= require('../models/conversation.js');
var express    = require('express');
var router 	   = express.Router();


function createConversation(req, res){
	if (req.body.From){
		req.body.phoneNumber = req.body.From;
	}
	if (req.body.Text){
		req.body.text = req.body.Text;		
	}

	d = new Date();
	year = d.getFullYear();
	month = d.getMonth();
	day = d.getDate();
	hour = d.getHours();
	minute = d.getMinutes();
	
	if(hour < 12)
		label = "AM"
	else
		label = "PM"

	if(hour > 12)
		hour = hour % 12;

	if(day < 10)
		day = "0"+day;

	if(minute < 10)
		minute = "0"+minute;

	if(hour == 0)
		hour = 12;

	stamp = month+"/"+day+"/"+year+" at "+hour+":"+minute+label;
	Conversation.find({phoneNumber: req.body.phoneNumber}, function (err, result){
		if(result.length == 0){

			var conversation = new Conversation();
			var newMessage = {
								text			: req.body.text,
								timeStamp		: Date(),
								timeStampString : stamp,
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
													timeStamp		: Date(),
													timeStampString : stamp,
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
													timeStamp		: Date(),
													timeStampString : stamp,
													isVolunteer		: true,
													volunteerID		: req.user[0].id,
													volunteerName	: req.user[0].username
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

function activateConversation(req, res){
	Conversation.findOneAndUpdate(req.params, {$set: {active : true, currentVolunteerID: req.user[0].id}}, function (err, conversation){
		res.json(conversation);
	});
}

function deactivateConversation(req, res){
	Conversation.findOneAndUpdate(req.params, {$set: {active : false, currentVolunteerID: "none"}}, function (err, conversation){
		res.json(conversation);
	});
}

function listInactiveConversations(req, res){
	Conversation.find({$and: [{active: false}, {unansweredMessageCount : {$gt: 0}}]}, function (err, results){
		res.json(results);
	});
}

function listActiveConversations(req, res){
	Conversation.find({currentVolunteerID: req.user[0].id}, function (err, results){
		res.json(results);
	});
}


function openConversation (req, res){
	Conversation.findOneAndUpdate(req.params, {$set: {unreadMessageCount : 0}}, function (err, conversation){
		res.json(conversation);
	});
}

router.route('/inactive').get(listInactiveConversations);
router.route('/active').get(listActiveConversations);
router.route('/activate/:phoneNumber').get(activateConversation);
router.route('/deactivate/:phoneNumber').get(deactivateConversation);
router.route('/open/:phoneNumber').get(openConversation);
router.route('/create').post(createConversation);

module.exports = router;
