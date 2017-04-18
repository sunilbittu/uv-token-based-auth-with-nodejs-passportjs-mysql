'use strict';
const mysql    = require('mysql');
const dbConfig = require('../../../config/index').DB;
const pool     = mysql.createPool(dbConfig);

// pool.query('SHOW TABLES', (error, results) => {
// 	if(error) return console.log(error);
// 	console.log(results)
// });

if (process.env.NODE_ENV === 'development') {
	pool.on('connection', function (connection) {
		console.log('%d conneted', connection.threadId)
	});

	pool.on('release', function (connection) {
		console.log('Connection %d released', connection.threadId);
	});
}


module.exports = pool;