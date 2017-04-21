'use strict';
const registerRoute = require('./register');


module.exports = request => {
	registerRoute(request);
};