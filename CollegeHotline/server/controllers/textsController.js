var SMS = require('../models/sms');

module.exports.create = function(req, res){
	var sms = new SMS(req.body);
	sms.save(function (err, result){
		res.json(result);
	});
}

module.exports.list = function(req, res){
	SMS.find(req.query, function (err, results){
		res.json(results);
	});
}

module.exports.remove = function(req, res){
	SMS.find( req.params, function ( err, sms ){
	    sms[0].remove( function ( err, sms ){
	    	res.json(sms);
	    });
  	});
}