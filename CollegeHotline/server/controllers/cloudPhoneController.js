var Message = require('../models/message.js');
var plivo = require('plivo-node');
var p = plivo.RestAPI(require('./configPlivo'));

module.exports.receiveMsg = function(req, res){
	console.log(req.query);
	var msg = new Message();
	msg.phoneNumber = req.query.From;
	msg.active = true;
	msg.text = req.query.Text;
	msg.save(function (err, result){
		res.json(result);
	});
}

module.exports.sendMsg = function(req, res){
	//use plivo api to send the msg
	//update database to reflect said change
	var params = {
 	   'src': '14156568811', // Caller Id
 	   'dst' : req.query.phoneNumber, // User Number to Call
 	   'text' : req.query.text,
 	   'type' : "sms",
	};

	p.send_message(params, function (status, response) {
		if (status == 202){
			var msg = new Message(req.query);
			msg.active = true;
			msg.isVolunteer = true;
			msg.hasBeenRead = true;
			msg.save(function (err, result){
				res.json(result);
			});
		}
		else{
			res.json(response);
		}
	});
}

module.exports.forwardCall = function(req, res){
	//look in volunteers and pick a free one with heuristics function
	//save said volunteer and mark him as unavailable
	//using this, construct the appropriate XML
	console.log(req.query);
	var srcNumber = 1234567890;  //number for some volunteer eventually
	var dstNumber = 18313926314;
	var responseForPlivo = plivo.Response();
	var dial = responseForPlivo.addDial({callerId: srcNumber})
	dial.addNumber(dstNumber);
	res.set({'Content-Type': 'text/xml'});
	res.end(responseForPlivo.toXML());
}
