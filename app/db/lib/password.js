'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash (passWord) {
	return bcrypt.hash(passWord, saltRounds); // This will return promise..
}

function isMatched (plainPassword, hashedPassword) {
	return bcrypt.compare(plainPassword, hashedPassword);
}


module.exports = {
	hash: hash,
	isMatched: isMatched
};