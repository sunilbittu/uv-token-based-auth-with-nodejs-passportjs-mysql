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

module.exports = {
	byId: removeById,
	byEmail: removeByEmail
};