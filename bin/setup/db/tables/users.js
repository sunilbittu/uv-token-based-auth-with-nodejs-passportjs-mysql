'use strict';
const exeQuery = require('../lib/exe-query');
const checkTableExist = require('../lib/check-table-exist');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isNotProduction = (NODE_ENV !== 'production');
const tableName = 'users';

function createTable (tableName = 'users') {

	const SQLQuery = `
	CREATE TABLE ${tableName} (
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(100),
	email varchar(100),
	password varchar(500),
	fbid varchar(300),
	fbname varchar(100),
   gmail varchar(100),
   googleid varchar(300),
   googlename varchar(300),
	PRIMARY KEY (id)
	)`;
   // console.log(SQLQuery)
   if (isNotProduction) console.log('Creating New Table: %s', tableName);

   return exeQuery(SQLQuery)
   .then(results => {
      const isTableCreated = (results.serverStatus === 2);
            if (isNotProduction && isTableCreated) {
               console.log('%s Table Created Successfully', tableName);
            } else {
               console.log(results);
            }
    return isTableCreated;
   })
   .catch(error => {
      console.log(error);
   });
}

function checkAndSetupTable() {
   return checkTableExist(tableName)
   .then(isTableExist => {
       if (isTableExist) {
         return Promise.resolve(true);
      } else {
         return createTable(tableName);
      }
   })
   .catch(error => {
      console.log(error);
      process.exit(1);
   })

}

// checkAndSetupTable()
// .then(res => console.log(res))
// .catch(res => console.log(res))

module.exports = checkAndSetupTable;
