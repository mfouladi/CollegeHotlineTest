var express      = require('express'),
	app	           = express(),
	bodyParser 		 = require('body-parser'),
	mongoose       = require('mongoose'),
  mysql          = require('mysql'),
  cookieParser   = require('cookie-parser'),
  session        = require('express-session'),
  flash          = require('connect-flash'),
  passport       = require('passport'),
  morgan         = require('morgan'),
	conversationController   = require('./server/controllers/conversationController'),
	notesBasicController     = require("./server/controllers/notesBasicController"),
	notesShortTermController = require("./server/controllers/notesShortTermController"),
	cloudPhoneController     = require("./server/controllers/cloudPhoneController.js");

mongoose.connect('mongodb://localhost:27017/CollegeHotline');

require('./server/controllers/passport.js')(passport);

//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret : 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/css', express.static(__dirname+'/client/views/css'));
app.use('/views', express.static(__dirname+'/client/views'));
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
  res.sendFile(__dirname + '/client/views/index.html');
});

app.get('/notes', isLoggedIn, function (req, res){
  res.sendFile(__dirname + '/client/views/notes.html');
});


//REST API
app.get('/api/notes/basic', notesBasicController.list);
app.post('/api/notes/basic/create', notesBasicController.create);
app.post('/api/notes/basic/update', notesBasicController.update);
app.post('/api/notes/short/goal', notesShortTermController.create);

//Conversation Calls
app.get('/api/conversation', conversationController.listConversations);
app.post('/api/conversation/create', conversationController.createConversation);
app.get('/api/conversation/activate/:phoneNumber', conversationController.activateConversation);
app.get('/api/conversation/deactivate/:phoneNumber', conversationController.deactivateConversation);
app.get('/api/conversation/open/:phoneNumber', conversationController.openConversation);

//CloudPhone things
app.get('/api/cloudPhone/receiveMsg', cloudPhoneController.receiveMsg);
app.get('/api/cloudPhone/sendMsg', cloudPhoneController.sendMsg);
app.get('/api/cloudPhone/forwardCall', cloudPhoneController.forwardCall);
app.get('/api/cloudPhone/hangUp', cloudPhoneController.hangUp);

//Volunteer Login

/*
  To access user info from anywhere, use req.user

*/
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/login.html' , { errorMessage: req.flash('loginMessage')});
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/client/views/wordpress/signup.html' , { errorMessage: req.flash('signupMessage')});
});

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/login');
});

app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/conversations', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
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


app.listen(3000, function(){
	console.log('I\'m Listening...');
});