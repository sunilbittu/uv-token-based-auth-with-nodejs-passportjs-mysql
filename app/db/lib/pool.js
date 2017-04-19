'use strict';
const mysql    = require('mysql');
const dbConfig = require('../../../config/index').DB;
const pool     = mysql.createPool(dbConfig);
const NODE_ENV = process.env.NODE_ENV || 'development';
const isNotProduction = (NODE_ENV !== 'production');

function createUsersTable () {

	const SQLQuery = `
	CREATE TABLE user (
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(100),
	email varchar(100),
	password varchar(500),
	fbid varchar(300),
	fbname varchar(100),
	PRIMARY KEY (id)
	)`;
   // console.log(SQLQuery)
   if (isNotProduction) console.log('Creating New Table');

   pool.query(SQLQuery, (error, results) => {
   	if(error) return console.log(error);
   	const isTableCreated = (results.serverStatus === 2);
   	if (isNotProduction && isTableCreated)  console.log('Table Created Successfully');
   });
}


function checkWhetherTableExist (error, results) {
	if(error) return console.log(error);
	const isTableNotExist = (results.length === 0);

	if (isTableNotExist) {
		if (isNotProduction) console.log('users table not exist');
		createUsersTable();
	}

}

pool.query('SHOW TABLES LIKE "users"', checkWhetherTableExist);

pool.on('connection', function (connection) {
	console.log('%d conneted', connection.threadId)
});

pool.on('release', function (connection) {
	console.log('Connection %d released', connection.threadId);
});

module.exports = pool;
