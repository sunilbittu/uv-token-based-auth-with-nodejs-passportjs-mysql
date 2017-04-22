'use strict';
const passport = require('passport');

require('./register')(passport);
require('./login')(passport);
require('./fb-login')(passport);
require('./google-login')(passport);

module.exports = passport;