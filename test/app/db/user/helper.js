'use strict';
const path     = require('path');
const exeQuery = require(path.resolve('./app/db/lib/exe-query'));

function errorHandler (error) {
	console.log(error);
	process.exit(1);
}

function createMockUsers () {
	const mockUsers = [];

	for (let i = 0; i < 2; i++) {
		const fbUser = {
			fbname: `fbuser${i}`,
			fbid: `fbid${i}`,
			email: `fbuser${i}@example.com`
		};

		const googleUser = {
			googlename: `googleuser${i}`,
			googleid: `googleid${i}`,
			gmail: `googleuser${i}@gmail.com`
		};

		const localUser = {
			name: `user${i}`,
			email: `user${i}@example.com`
		}

		mockUsers.push(fbUser, localUser, googleUser)
	}

	return Promise.all(mockUsers.map(user => exeQuery('INSERT INTO users SET ?', user)))
	.then(results => mockUsers)
	.catch(errorHandler);
}

function truncateUserTable() {
	return exeQuery('TRUNCATE TABLE users')
	.then(results => results)
	.catch(errorHandler);
}

module.exports = {
	truncateUserTable: truncateUserTable,
	createMockUsers: createMockUsers
};