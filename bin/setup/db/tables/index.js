'use strict';
const checkAndSetupUserTable = require('./users');
const tableSetups = [];

tableSetups.push(checkAndSetupUserTable());


module.exports = Promise.all(tableSetups);
