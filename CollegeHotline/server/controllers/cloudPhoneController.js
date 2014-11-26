var Message = require('../models/message.js');
var Volunteer = require('../models/volunteer.js');
var plivo = require('plivo-node');
var p = plivo.RestAPI(require('./configPlivo'));

var appNumber = "18582565412";
var appEndPoint = "mapscallcenter141120025606@phone.plivo.com";
var volunteerQueue = [];
var callerCalleeDict = {};
var unavailableText = "Thank you for calling the college hotline. Unfortunatly, all our volunteers are currently occupied. If you'd like, you could send your inquiries to us by text or you could call us at a later time. Have nice day."

function hash(value) {
    return (typeof value) + ' ' + (value instanceof Object ?
        (value.__hash || (value.__hash = ++arguments.callee.current)) :
        value.toString());
}


module.exports.receiveMsg = function(req, res){
	//console.log(req.query);
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
	//console.log(req.query);
	var params = {
 	   'src': appNumber, // Caller Id
 	   'dst' : req.query.phoneNumber, // User Number to Call
 	   'text' : req.query.text,
 	   'type' : "sms",
	};

	p.send_message(params, function (status, response) {
		//console.log(params);
		if (status == 202){
			var msg = new Message(req.query);
			msg.active = true;
			msg.isVolunteer = true;
			msg.hasBeenRead = true;
			msg.save(function (err, result){
				res.json([result]);
			});
		}
	});
}

var forwardHelper = function(req, res){
	//checks the status of voluteer, still available and online
	//if so, update their status to unavailable and route them the call
	//recurse with next volunteer other wise
	if (volunteerQueue.length == 0){
			//var responseForPlivo = plivo.Response();
			//responseForPlivo.addSpeak(unavailableText);
			//res.set({'Content-Type': 'text/xml'});
			//res.end(responseForPlivo.toXML());	
		Volunteer.find({available:true, online:true}, function(err, result){
			volunteerQueue = volunteerQueue.concat(result);
			if (volunteerQueue.length == 0){
				var responseForPlivo = plivo.Response();
				responseForPlivo.addSpeak(unavailableText);
				res.set({'Content-Type': 'text/xml'});
				res.end(responseForPlivo.toXML());			
			}
			else{
				forwardHelper(req, res);
			}
		});		
	}
	else{
		Volunteer.find({phoneNumber: volunteerQueue[0].phoneNumber}, function(err, result){
			console.log(result);
			if(result[0].available && result[0].online){
				//console.log("calledfind");
				var srcNumber = appNumber;  
				var dstNumber = volunteerQueue[0].phoneNumber;
				Volunteer.update({phoneNumber: volunteerQueue[0].phoneNumber}, {
					$set:{currentCall: req.query.From, 
						available: false
					}}, 
					function (err, result){
						console.log(result);
					}
				);
				//Volunteer.update({phoneNumber: volunteerQueue[0].phoneNumber}, {$set:{available:false}})
				callerCalleeDict[hash(req.query.From)] = dstNumber;
				volunteerQueue.shift();

				var responseForPlivo = plivo.Response();
				var dial = responseForPlivo.addDial({callerId: srcNumber});
				dial.addUser(appEndPoint);
				dial.addNumber(dstNumber);

				//console.log("end");
				res.set({'Content-Type': 'text/xml'});
				res.end(responseForPlivo.toXML());	
			}
			else{
				//console.log("volunteer status changed, trying next volunteer")
				volunteerQueue.shift();
				forwardHelper(req, res);
			}
		})
	
	}
}


module.exports.forwardCall = function(req, res){
	//picks first volunteer from a queue to forward call to
	//if queueu empty, look in database to fill it
	//using this, construct the appropriate XML
	//console.log(req.query.From);
	if (volunteerQueue.length == 0){
		//console.log("pulling new");
		Volunteer.find({available:true, online:true}, function(err, result){
			volunteerQueue = volunteerQueue.concat(result);
			if (volunteerQueue.length == 0){
				var responseForPlivo = plivo.Response();
				responseForPlivo.addSpeak(unavailableText);
				res.set({'Content-Type': 'text/xml'});
				res.end(responseForPlivo.toXML());			
			}
			else{
				forwardHelper(req, res);
			}
		});
	}
	else{
		//console.log("already exists");
		forwardHelper(req, res);
	}
	

}


module.exports.hangUp = function(req, res){
	//not doing anything currently, this may be useful, maybe
	console.log(req.query);
	console.log(callerCalleeDict);
	var calleeNumber = callerCalleeDict[hash(req.query.From)]; 
	Volunteer.update({phoneNumber: calleeNumber}, {
		$set:{available: true}}, function (err, result){
			console.log(result);
	});
	delete callerCalleeDict[hash(req.query.From)];
}
