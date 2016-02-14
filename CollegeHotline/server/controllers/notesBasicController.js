/*jshint strict: true, node: true, unused: false */
"use strict";

var express = require('express');
var router = express.Router();
var NotesBasic = require('../models/notesBasic.js');
var Volunteer = require('../models/volunteer.js');

function list(req, res) {
	NotesBasic.find(req.query, function (err, results) {
		res.json(results);
	});
}

function create(req, res) {
	var newNote = new NotesBasic();

	newNote.phoneNumber = req.body.phoneNumber;
	newNote.studentName = req.body.studentName;
	newNote.schoolName = req.body.schoolName;
	newNote.currentYear = req.body.currentYear;
	newNote.studentAddress = req.body.studentAddress;

	newNote.save(function (err, result) {
		res.json(result);
	});
}

function update(req, res) {
	NotesBasic.update({
			phoneNumber: req.body.phoneNumber
		}, {
			$set: {
				studentName: req.body.studentName,
				schoolName: req.body.schoolName,
				currentYear: req.body.currentYear,
				studentAddress: req.body.studentAddress
			}
		},
		function (err, results) {
			res.json(results);
		}
	);
}

function updateShortGoals(req, res) {
	NotesBasic.update({
			phoneNumber: req.body.phoneNumber
		}, {
			$push: {
				goals: {
					body: req.body.goals,
					checked: req.body.checked
				}
			}
		},
		function (err, results) {
			res.json(results);
		}
	);
}

function saveQuestion1(req, res) {
	NotesBasic.update({
			phoneNumber: req.body.phoneNumber
		}, {
			$push: {
				question1: {
					body: req.body.question1
				}
			}
		},
		function (err, results) {
			res.json(results);
		}
	);
}

function saveQuestion2(req, res) {
	NotesBasic.update({
			phoneNumber: req.body.phoneNumber
		}, {
			$push: {
				question2: {
					body: req.body.question2
				}
			}
		},
		function (err, results) {
			res.json(results);
		}
	);
}

function load(req, res) {
	Volunteer.find({
		phoneNumber: req.user[0].phoneNumber
	}, function (err, results) {
		res.json(results);
	});
}

router.route('/').get(list);
router.route('/create').post(create);
router.route('/update').post(update);
router.route('/updateShortGoals').put(updateShortGoals);
router.route('/saveQuestion1').put(saveQuestion1);
router.route('/saveQuestion2').put(saveQuestion2);
router.route('/load').get(load);

module.exports = router;