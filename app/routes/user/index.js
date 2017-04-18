'use strict';
const express = require('express');
const path    = require('path');
const User    = require('../../db/user/index');
const router  = express.Router();


router.route('/')
.post((req, res) => {
	const body = req.body;
	const user = {};
	if (body) {
		user.name     = body.name;
		user.email    = body.email;
		user.password = body.password;
	}
	User.create(user, 'local')
	.then(resData => {
		res.json(resData);
	})
	.catch(error => {
		console.log(error);
	})
})

router.route('/:userId')
.get((req, res) => {
	const userId = req.params.userId;
	User.find({userId: userId})
	.then(user => {
		res.json(user);
	})
	.catch(error => {
		console.log(error);
	})
})
.delete((req, res) => {
	const userId = req.params.userId;
	User.remove({userId: userId})
	.then(isDeleted => {
		res.json({isDeleted: isDeleted});
	})
	.catch(error => {
		console.log(error);
	})
})
.put((req, res) => {
	const userId = req.params.userId;
	const body = req.body;
	const user = {};
	if (body) {
		user.name = body.name;
		user.email = body.email;
		user.password = body.password
	}

	User.update({userId: userId}, user)
	.then(isUpdated => {
		res.json({isUpdated: isUpdated});
	})
	.catch(error => {
		console.log(error);
	})
})

module.exports = router;