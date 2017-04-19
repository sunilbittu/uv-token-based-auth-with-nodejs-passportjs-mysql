'use strict';
const mysql    = require('mysql');
const path     = require('path');
const dbConfig = require(path.resolve('./config/index')).DB;
const pool     = mysql.createPool(dbConfig);


// pool.on('connection', function (connection) {
// 	console.log('%d conneted', connection.threadId)
// });

// pool.on('release', function (connection) {
// 	console.log('Connection %d released', connection.threadId);
// });

module.exports = pool;
