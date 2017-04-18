'use strict';

const findUserTest   = require('./find');
const createUserTest = require('./create');
const updateUserTest = require('./update');

describe('User', () => {
	findUserTest();
	createUserTest();
	updateUserTest();
})
