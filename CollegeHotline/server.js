<<<<<<< HEAD
var express 		= require('express'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose'),
	textsController = require('./server/controllers/textsController'),
	conversationController = require('./server/controllers/conversationController'),
	notesBasicController = require("./server/controllers/notesBasicController"),
	notesShortTermController = require("./server/controllers/notesShortTermController");


=======
var express 				= require('express'),
	app						= express(),
	bodyParser 				= require('body-parser'),
	mongoose				= require('mongoose'),
	conversationController 	= require('./server/controllers/conversationController');
>>>>>>> ef8d57f63ee3ed99688a8fb1b2af0fbb1df139d6

mongoose.connect('mongodb://localhost:27017/CollegeHotline');

app.use(bodyParser());

app.get('/', function (req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});
app.get('/notes', function (req, res){
	res.sendFile(__dirname + '/client/views/notes.html');
});

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/css', express.static(__dirname+'/client/views/css'));

//REST API
<<<<<<< HEAD
app.get('/api/sms', textsController.list);
app.post('/api/sms', textsController.create);

app.all( '/api/sms/:mid', textsController.remove);
app.get('/api/notes/basic', notesBasicController.list);
app.post('/api/notes/basic', notesBasicController.create);
app.post('/api/notes/short/goal', notesShortTermController.create);
=======

//Message Calls
//app.get('/api/message', conversationController.listMessages);
//app.post('/api/message', conversationController.createMessage);
//app.all( '/api/message/:mid', conversationController.removeMessage);

//Conversation Calls
app.get('/api/conversation', conversationController.listConversations);
app.post('/api/conversation', conversationController.createConversation);
app.get('/api/conversation/activate/:phoneNumber', conversationController.activateConversation);
app.get('/api/conversation/deactivate/:phoneNumber', conversationController.deactivateConversation);

//app.all( '/api/conversation/:phoneNumber', conversationController.removeConversation);
>>>>>>> ef8d57f63ee3ed99688a8fb1b2af0fbb1df139d6

app.listen(3000, function(){
	console.log('I\'m Listening...');
});