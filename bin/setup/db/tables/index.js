'use strict';
const checkAndSetupUserTable = require('./users');
const tableSetups = [];

tableSetups.push(checkAndSetupUserTable);

function checkAndSetupTables () {

	return Promise.all(tableSetups.map(tableSetup => tableSetup()));
}


module.exports = checkAndSetupTables;
