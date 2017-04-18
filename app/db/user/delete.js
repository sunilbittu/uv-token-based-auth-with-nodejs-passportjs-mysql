'use strict';
const exeQuery = require('../lib/exe-query');

function removeById (userId) {
	const SQLQuery = `DELETE FROM users WHERE id = "${userId}"`;
	return exeQuery(SQLQuery)
	.then(result => {
		const isRemoved = (result.affectedRows === 1);
		return isRemoved;
	})
}

function removeByEmail (email) {
	const SQLQuery = `DELETE FROM users WHERE email = "${email}"`;
	return exeQuery(SQLQuery)
	.then(result => {
		const isRemoved = (result.affectedRows === 1);
		return isRemoved;
	})
}


function remove(query) {
	if (query) {
		const email  = query.email;
		const userId = query.userId;

		if (email) {
			return removeByEmail(email);
		} else if (userId) {
			return removeById(userId);
		} else {
			const error = new Error('Invalid Query');
		    return Promise.reject(error);
		}

	} else {
		const error = new Error('Find Query And Update Options Must Be Provided');
		return Promise.reject(error);
	}
}

module.exports = remove;