var express 		= require('express'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose'),
	textsController = require('./server/controllers/textsController');

mongoose.connect('mongodb://localhost:27017/SMS');

app.use(bodyParser());

app.get('/', function (req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname+'/client/js'));

//REST API
app.get('/api/sms', textsController.list);
app.post('/api/sms', textsController.create);

app.listen(3000, function(){
	console.log('I\'m Listening...');
});