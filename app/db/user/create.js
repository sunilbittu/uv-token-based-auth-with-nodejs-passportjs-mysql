'use strict';
const exeQuery     = require('../lib/exe-query');
const passwordUtil = require('../lib/password');

function createLocalUser (email, password, name) {

	const isOK = ( email && name && password );

	if (isOK) {
		const user = {
			email: email,
			name: name
		};

		return passwordUtil.hash(password)
		.then(passwordHash => {
			user.password  = passwordHash;				
			const SQLQuery = 'INSERT INTO users SET ?';
			return exeQuery(SQLQuery, user);
		})
		.then(results => {
			user.id = results.insertId;
			return user;
		})

	} else {
		const error = new Error('Should Provide Email, Password And Name');
		return Promise.reject(error);
	}
	
}

function createFbUSer (email, fbId, fbName) {
	
	const isOK = fbId && fbName; // Minimum Requirement To Proceed Further..

	if (isOK) {
		const user = {
			fbid: fbId,
			fbname: fbName
		};
		
		if (email) {
			user.email = email;
		}

		const SQLQuery  = 'INSERT INTO users SET ?';

		return exeQuery(SQLQuery, user)
		.then(results => {
			user.id = results.insertId;
			return user;
		})

	} else {
		const error = new Error('Something Went Wrong.. Failed To Fullfill Requirements Of Fb Login');
		return Promise.reject(error);
	}
}


function create (User = {}, typeOfUser) {
	const email = User.email;

	if (typeOfUser === 'local') {
		const name     = User.name;
		const password = User.password;
		return createLocalUser(email, password, name);

	} else if (typeOfUser === 'fb') {
		const fbId     = User.fbId;
		const fbName   = User.fbName;
		return createFbUSer (email, fbId, fbName);
	} else {
		const error = new Error('Invalid User Type');
		return Promise.reject(error);
	}
}

module.exports = create;
