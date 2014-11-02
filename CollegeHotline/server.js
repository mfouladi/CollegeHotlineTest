var express 		= require('express'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose'),
	textsController = require('./server/controllers/textsController'),
	conversationController = require('./server/controllers/conversationController');

mongoose.connect('mongodb://localhost:27017/SMS');

app.use(bodyParser());

app.get('/', function (req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname+'/client/js'));
app.use('/css', express.static(__dirname+'/client/views/css'));

//REST API
app.get('/api/sms', textsController.list);
app.post('/api/sms', textsController.create);
app.all( '/api/sms/:mid', textsController.remove);

app.listen(3000, function(){
	console.log('I\'m Listening...');
});