'use strict';
const pool = require('./pool');

function exeQuery (query, queryValues) {
	return new Promise((resolve, reject) => {
		
		pool.getConnection((err, connection) => {
			
			function cb (error, results) {
				connection.release();
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			}
			
			if (query && queryValues) {
				connection.query(query, queryValues, cb);
			} else {
				connection.query(query, cb);
			}

		});
	})
}

module.exports = exeQuery;
