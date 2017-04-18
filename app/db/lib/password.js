'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash (passWord) {
	return bcrypt.hash(passWord, saltRounds); // This will return promise..
}

function isMatched (passWord, hashedPassword) {
	return bcrypt.compare(passWord, hashedPassword);
}


module.exports = {
	hash: hash,
	isMatched: isMatched
};