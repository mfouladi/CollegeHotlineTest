var mongoose = require('mongoose');

module.exports = mongoose.model('SMS',{
	message: String
});