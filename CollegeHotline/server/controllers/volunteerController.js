var Volunteer 	= require('../models/volunteer.js')

module.exports.listVolunteers = function(req, res){
	Volunteer.find(req.params, function (err, volunteer){
		res.json(volunteer);
	});
}