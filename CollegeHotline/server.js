var express 		= require('express'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose'),
	wordpress		= require('wordpress'),
	conversationController = require('./server/controllers/conversationController'),
	notesBasicController = require("./server/controllers/notesBasicController"),
	notesShortTermController = require("./server/controllers/notesShortTermController");

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
app.use('/views', express.static(__dirname+'/client/views'));

//REST API
app.get('/api/notes/basic', notesBasicController.list);
app.post('/api/notes/basic', notesBasicController.create);
app.post('/api/notes/short/goal', notesShortTermController.create);

//Conversation Calls
app.get('/api/conversation', conversationController.listConversations);
app.post('/api/conversation', conversationController.createConversation);
app.get('/api/conversation/activate/:phoneNumber', conversationController.activateConversation);
app.get('/api/conversation/deactivate/:phoneNumber', conversationController.deactivateConversation);

app.listen(3000, function(){
	console.log('I\'m Listening...');
});