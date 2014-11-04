var express 				= require('express'),
	app						= express(),
	bodyParser 				= require('body-parser'),
	mongoose				= require('mongoose'),
	messageController 		= require('./server/controllers/messageController'),
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
app.get('/api/message', messageController.listMessages);
app.post('/api/message', messageController.createMessage);
app.all( '/api/message/:mid', messageController.removeMessage);

//Conversation Calls
app.get('/api/conversation', conversationController.list);
app.post('/api/conversation', conversationController.create);
app.all( '/api/conversation/:phoneNumber', conversationController.remove);

app.listen(3000, function(){
	console.log('I\'m Listening...');
});