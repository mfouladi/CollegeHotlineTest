var Message 		= require('../models/message.js');
var Conversation 	= require('../models/conversation.js')

module.exports.create = function(req, res){
	var conversation = new Conversation(req.body);
	conversation.save(function (err, result){
		res.json(result);
	});
}

module.exports.list = function(req, res){
	Conversation.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.remove = function(req, res){
	Conversation.find(req.params, function ( err, message ){
	    conversation[0].remove( function ( err, message ){
	    	res.json(message);
	    });
  	});
}


