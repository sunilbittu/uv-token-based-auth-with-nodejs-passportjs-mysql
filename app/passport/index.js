'use strict';
const passport = require('passport');

// function initStratagies () {
// 	require('./register')(passport);
// 	require('./login')(passport);
// };

require('./register')(passport);
require('./login')(passport);
require('./fb-login')(passport);



module.exports = passport;