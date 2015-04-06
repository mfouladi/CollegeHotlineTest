//volunteerController.js

module.exports.volunteerIsAdmin = function(req, res, next){
	Volunteer.find({phoneNumber: req.user[0].phoneNumber}, function(err, results){
		if(results[0].isAdmin == true){
			console.log("this is returning true!!!!")
			return next();
		}
	});
}

//server.js

app.all('/api/*', isLoggedIn);
//REST API
app.get('/loggedin', isLoggedIn, function(req, res) { 
  res.send(req.isAuthenticated() ? req.user : []); 
});