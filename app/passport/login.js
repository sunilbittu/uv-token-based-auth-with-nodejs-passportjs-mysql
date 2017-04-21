'use strict';
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/user');

module.exports = passport => {

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
            // passReqToCallback: true
    }, function(email, password, done) {
        // console.log(email, password);
        User.find({ email: email })
            .then(user => {
                if (user) {
                    // If User Exist.... Allow Them To Login
                    const message = 'Login Success';
                    console.log(message);
                    return done(null, user, { message: message });
                } else {
                    // If User Not Exist.... Fail To Login
                    return done(null, false, { message: message });
                }
            })
            .catch(done)
    }))
};
