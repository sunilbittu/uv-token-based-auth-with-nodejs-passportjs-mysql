'use strict';

const findUserTest   = require('./find');
const createUserTest = require('./create');
const updateUserTest = require('./update');
const deleteUserTest = require('./delete');

describe('User', () => {
	findUserTest();
	createUserTest();
	updateUserTest();
	deleteUserTest();
})
