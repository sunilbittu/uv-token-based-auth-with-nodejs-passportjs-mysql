'use strict';
const exeQuery = require('../lib/exe-query');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isNotProduction = (NODE_ENV !== 'production');

function checkTableExist (tableName) {
   const SQLQuery = `SHOW TABLES LIKE "${tableName}"`;

	return exeQuery(SQLQuery)
	.then(results => {
      const isTableExist = (results.length > 0);
      if (isTableExist) {
         if (isNotProduction) console.log('%s Table Already Exist', tableName);
         return Promise.resolve(true);
      } else {
         if (isNotProduction) console.log('%s Table Not Exist', tableName);
         return Promise.resolve(false);
      }
   })
	.catch(error => {
		console.log(error);
		process.exit(1);
	})
}

module.exports = checkTableExist;
