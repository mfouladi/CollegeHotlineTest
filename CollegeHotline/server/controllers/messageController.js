var Message 		= require('../models/message.js');
var Conversation 	= require('../models/conversation.js')

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
	Message.find( req.params, function ( err, message ){
	    message[0].remove( function ( err, message ){
	    	res.json(message);
	    });
  	});
}