'use strict';
const exeQuery     = require('../lib/exe-query');
const passwordUtil = require('../lib/password');
const findUser     = require('./find');


function errorHandler (error) {
	return {
		isSuccess: false,	
		message: error.message,
		error: error
	}
}


function createLocalUser (email, password, name) {

	function checkAndCreateUser (user) {
		if (user) {
			return {
				isSuccess: false,
				message: 'User Already Exist',
				user: user
			};
		} else {
			const user = {
				name: name,
				email: email
			};

			return passwordUtil.hash(password)
			.then(passwordHash => {
				user.password = passwordHash;				
				const SQLQuery = 'INSERT INTO users SET ?';
				return exeQuery(SQLQuery, user);
			})
			.then(results => {
				user.id = results.insertId;
				return {
					isSuccess: true,
					message: 'User Successfully Created',
					user: user
				}
			})

		}

	}

	const isOK = email && name && password;

	if (isOK) {
		return findUser({email : email})
		.then(checkAndCreateUser)
		.catch(errorHandler)
	} else {
		const error = new Error('Should Provide Email, Password And Name');
		return Promise.reject(error);
	}
	
}

function createFbUSer (email, fbId, fbName) {

	function updateLocalUserToFbUser (user) {
		const userId   = user.id;
		const SQLQuery = `UPDATE users SET fbid = "${fbId}", fbname = "${fbName}" WHERE id = "${userId}"`;
		return exeQuery(SQLQuery)
		.then(results => {
			// console.log(results);
			const updatedUser  = Object.assign({}, user);
			updatedUser.fbname = fbName;
			updatedUser.fbid   = fbId; 
			return updatedUser;
		})

	}

	function createNewFbUser () {
		const newFbUser = {
			fbid: fbId,
			fbname: fbName
		};
		
		if (email) {
			newFbUser.email = email;
		}

		const SQLQuery  = 'INSERT INTO users SET ?';

		return exeQuery(SQLQuery, newFbUser)
		.then(results => {
			newFbUser.id = results.insertId;
			return newFbUser;
		})
	}

	function checkLocalUserExist (user) {
		if (user) {
			return updateLocalUserToFbUser(user);
		} else {
			return createNewFbUser();
		}

	}

	function checkFbUserExistOrCreateOne (fbUser) {

		function successResponse (user) {
			const resData = {
				isSuccess: true,
				message: 'Success',
				user: user
			};
			return resData;
		}

		if (fbUser) {
			return successResponse(fbUser)
		} else if (email) {
			return findUser({email : email})
			.then(checkLocalUserExist)
			.then(successResponse)
			.catch(errorHandler)
		} else {
			return createNewFbUser()
			.then(successResponse)
			.catch(errorHandler)
		}
	}
	
	const isOK = fbId && fbName; // Minimum Requirement To Proceed Further..

	if (isOK) {
		/*
		   if fbId and fbName is present check whether user with that fbId exist or not ...
		   if exist just --> return that user 
		   if not --> check email is present or not..
		   if we have email then again check with email whether user with this email exist or not ...
		   if exist update him with fb id we have..
		   if not exist create new fb User
		   if we dont have email ...
		   then just create new fb user with fb id and name.. and ask him to provide email
		*/
		return findUser({fbId : fbId})
		.then(checkFbUserExistOrCreateOne)
		.catch(errorHandler)

	} else {
		const error = new Error('Something Went Wrong.. Failed To Fullfill Requirements Of Fb Login');
		return Promise.reject(error);
	}


	

// old
	// const fbUser = {
	// 	fbid: fbId,
	// 	email: email,
	// 	fbname: fbName
	// };


	// return findUser.byFbId(fbId)
	// .then(results => {
	// 	const isFbUser = (results.length > 0);

	// 	if (isFbUser) {			
	// 		const user = results[0];
	// 		return {
	// 			isSuccess: true,
	// 			user: user
	// 		}
	// 	} else if (email) {			
	// 		return findUser.byEmail(email)
	// 		.then(results => {
	// 			const isUserExist = (results.length > 0);
	// 			if (isUserExist) {
	// 				const SQLQuery = 'UPDATE users SET fbid = ?, fbname = ? WHERE email = ?';
	// 				return exeQuery(SQLQuery, [fbId, fbName, email]);
	// 			} else {
	// 				const SQLQuery = `INSERT INTO users SET ?`;
	// 				return exeQuery(SQLQuery, fbUser);
	// 			}
	// 		})
	// 		.then(results => {
	// 			fbUser.id = results.insertId;
	// 			return {
	// 				isSuccess: true,
	// 				user: fbUser
	// 			}
	// 		})
	// 	} 
	// })
	// .catch(error => {
	// 	const message = 'Failed To Create Fb User';
	// 	return generateErrorRespnse(error, message);

	// })
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
