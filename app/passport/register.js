'use strict';
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../db/user/index')
passport.use('register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
   // passReqToCallback: true
}, function(email, password, done) {
   // console.log(email, password);

}
))