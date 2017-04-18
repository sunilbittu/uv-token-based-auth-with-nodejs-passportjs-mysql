'use strict';
const exeQuery = require('../lib/exe-query');

function checkUser (result) {
	const isUserExist = (result.length > 0 && result[0]);
	if (isUserExist) {
		return result[0];
	} else {
		return null;
	}
}

function findByUserId (userId) {
	if (userId) {
		const SQLQuery = `SELECT * FROM users WHERE id = "${userId}"`;
		return exeQuery(SQLQuery)
		.then(checkUser);
	}
}

function findByEmail (email) {
	if (email) {
		const SQLQuery = `SELECT * FROM users WHERE email = "${email}"`;
		return exeQuery(SQLQuery)
		.then(checkUser);
	}
}

function findByFbId (fbId) {
	if (fbId) {
		const SQLQuery = `SELECT * FROM users WHERE fbid = "${fbId}"`;
		return exeQuery(SQLQuery)
		.then(checkUser);
	}
}


function find (query) {
	if (query && (typeof query === 'object')) {
		const email  = query.email;
		const userId = (query.id || query.userId);
		const fbId   = query.fbId;

		if (email) {
			return findByEmail(email);
		} else if (userId) {
			return findByUserId(userId);
		} else if (fbId) {
			return findByFbId(fbId);
		} else {
			const error = new Error('Invalid Find Query');
			return Promise.reject(error);
		}
	}
}

// const myUsers = [];

// for (let i = 0; i < 5; i++) {
// 	if ((i % 2) === 0) {
// 		myUsers.push({
// 			fbname: `fbuser${i}`,
// 			fbid: `fbidvalue${i}`,
// 			email: `fbuser${i}@example.com`
// 		})
// 	} else {
// 		myUsers.push({
// 			name: `user${i}`,
// 			email: `user${i}@example.com`
// 		})
// 	}
// }

// Promise.all(myUsers.map(x => {
//   return exeQuery('INSERT INTO users SET ?', x);
// }))
// .then(results => {
// 	console.log(results)
// })
// .catch(error => {
// 	console.log(error);
// })

// find({email: 'user1@example.com'}).
// find({fbId: 'fbidvalue1'})
// .then(res => console.log(res))
// .catch(error => {
// 	console.log('sorry');
// })

module.exports = find;

// module.exports = {
//     byId: findByUserId,
//     byUserId: findByUserId,
//     byEmail: findByEmail,
//     byFbId: findByFbId
// };