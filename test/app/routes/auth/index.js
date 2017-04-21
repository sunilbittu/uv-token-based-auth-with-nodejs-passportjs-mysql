'use strict';
const registerRoute = require('./register');
const loginRoute = require('./login');


module.exports = request => {
	registerRoute(request);
	loginRoute(request);
};