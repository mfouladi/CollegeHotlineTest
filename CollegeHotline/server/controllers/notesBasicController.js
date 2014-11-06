var NotesBasic = require('../models/NotesBasic');

module.exports.list = function(req, res){
	//eventually were gonna wanna
	var query = {phoneNumber : '1234567890'};
	//console.log(NotesBasic.find(query));
	NotesBasic.find(query, function (err, results){
	console.log(err);
	console.log(results);
		res.json(results);
	});
}