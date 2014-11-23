var express      = require('express'),
	app	           = express(),
	bodyParser 		 = require('body-parser'),
	mongoose       = require('mongoose'),
  mysql          = require('mysql'),
  cookieParser   = require('cookie-parser'),
	wordpress		   = require('wordpress'),
	passport		   = require('passport'),
  expressSession = require('express-session'),
  WordpressStrategy        = require('passport-wordpress').Strategy,
	conversationController   = require('./server/controllers/conversationController'),
	notesBasicController     = require("./server/controllers/notesBasicController"),
	notesShortTermController = require("./server/controllers/notesShortTermController"),
	cloudPhoneController     = require("./server/controllers/cloudPhoneController.js");

mongoose.connect('mongodb://localhost:27017/CollegeHotline');

app.use(cookieParser());
app.use(bodyParser());
app.use(expressSession({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.get('/notes', function (req, res){
	res.sendFile(__dirname + '/client/views/notes.html');
});

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/css', express.static(__dirname+'/client/views/css'));
app.use('/views', express.static(__dirname+'/client/views'));

//REST API
app.get('/api/notes/basic', notesBasicController.list);
app.post('/api/notes/basic/create', notesBasicController.create);
app.post('/api/notes/basic/update', notesBasicController.update);
app.post('/api/notes/basic/updateShortGoals', notesBasicController.updateShortGoals);
app.post('/api/notes/basic/updateLongGoals', notesBasicController.updateLongGoals);
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

app.listen(3000, function(){
	console.log('I\'m Listening...');
});