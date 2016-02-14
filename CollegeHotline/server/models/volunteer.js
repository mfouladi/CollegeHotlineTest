/*jshint strict: true, node: true, unused: false */
"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var volunteerSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	vid: String,
	phoneNumber: Number,
	email: String,
	online: Boolean,
	available: Boolean,
	numCalls: Number,
	currentCall: Number,
	leftPage: Boolean,
	isAdmin: Boolean,
	callHistory: [{
		firstName: String,
		lastName: String,
		phoneNumber: Number,
	}]
});

volunteerSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

volunteerSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Volunteer', volunteerSchema);