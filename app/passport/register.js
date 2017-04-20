'use strict';
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../db/user/index');

passport.use('register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
   // passReqToCallback: true
}, function(email, password, done) {
   // console.log(email, password);
   User.find({email: email})
   .then(user => {
   	if (user) {
   		// If User Alredy Exist....
         const message = 'User Already Exist';
         console.log(message);
         return done(null, false, { message: message });

      } else {
   		// If User Not Exist.... Create New One...
         const user = {
            email: email,
            password: password,
            name: name
         };

         User.create(user)
         .then(user => {
            if (user) {
               const message = 'User Successfully Created';
               console.log(message);
               return done(null, user, { message: message });
            }
         })
         .catch(done);
      }
   })
   .catch(done)
}
))