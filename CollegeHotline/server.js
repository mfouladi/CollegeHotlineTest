var express      = require('express'),
	app	           = express(),
	bodyParser 		 = require('body-parser'),
	mongoose       = require('mongoose'),
  cookieParser   = require('cookie-parser'),
  session        = require('express-session'),
  flash          = require('connect-flash'),
  passport       = require('passport'),
  morgan         = require('morgan'),
	conversationController   = require('./server/controllers/conversationController'),
	notesBasicController     = require("./server/controllers/notesBasicController"),
	cloudPhoneController     = require("./server/controllers/cloudPhoneController.js"),
  volunteerController      = require("./server/controllers/volunteerController.js");

mongoose.connect('mongodb://localhost:27017/CollegeHotline');

require('./server/controllers/passport.js')(passport);
var http         = require('http').Server(app);

//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret : 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/bower_components', express.static(__dirname+'/bower_components'));
app.use('/css', express.static(__dirname+'/client/views/css'));
app.use('/views', express.static(__dirname+'/client/views'));
app.use('/images', express.static(__dirname+'/client/views/images'));
app.use('/', express.static(__dirname+'/client/views/wordpress'));

//If not logged in
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/home.html');
});

app.get('/home', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/home.html');
});

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/about.html');
});

//If logged in
app.get('/conversations', isLoggedIn, function (req, res){
  res.sendFile(__dirname + '/client/views/chat.html');
});

app.get('/notes', isLoggedIn, function (req, res){
  res.sendFile(__dirname + '/client/views/notes.html');
});

app.get('/volunteers', isLoggedIn, function (req, res){
  res.sendFile(__dirname + '/client/views/volunteers.html');
});

app.get('/profile', isLoggedIn, function (req, res){
  res.sendFile(__dirname + '/client/views/profile.html');
});

//Volunteer Login

/*
  To access user info from anywhere, use req.user

*/

app.get('/logout', volunteerController.logoutVolunteer);

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/login.html' , { errorMessage: req.flash('loginMessage')});
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/signup.html' , { errorMessage: req.flash('signupMessage')});
});

app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/conversations', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  })
);

app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/conversations', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  })
);


function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}


app.get('/loggedin', function(req, res) { 
  res.send(req.isAuthenticated() ? req.user : []); 
});


//REST API
app.all('/api/*', isLoggedIn);

//Notes
var router = express.Router();
router.use('/notes/basic', notesBasicController);

//Conversation Calls
router.use('/conversation', conversationController);

app.use('/api', router);
//CloudPhone things
app.get('/api/cloudPhone/sendMsg', cloudPhoneController.sendMsg);
app.get('/api/cloudPhone/forwardCall', cloudPhoneController.forwardCall);
app.get('/api/cloudPhone/hangUp', cloudPhoneController.hangUp);

//Volunteer
app.get('/api/volunteers/status', volunteerController.listVolunteers);

app.listen(80, function(){
	console.log('I\'m Listening...');
});
