var SMS = require('../models/sms');

module.exports.create = function(req, res) {
	var sms = new SMS(req.body);
	sms.save(function (err, result){
		res.json(result);
	});
	console.log(req.body);
};

module.exports.list = function(req, res){
	SMS.find({}, function (err, results){
		res.json(results);
	})
}