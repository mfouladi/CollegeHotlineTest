var express 				= require('express'),
	app						= express(),
	bodyParser 				= require('body-parser'),
	mongoose				= require('mongoose'),
	conversationController 	= require('./server/controllers/conversationController');

mongoose.connect('mongodb://localhost:27017/CollegeHotline');

app.use(bodyParser());

app.get('/', function (req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/css', express.static(__dirname+'/client/views/css'));

//REST API

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

app.listen(3000, function(){
	console.log('I\'m Listening...');
});