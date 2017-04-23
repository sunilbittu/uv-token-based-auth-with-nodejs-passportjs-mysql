'use strict';
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/user');
const passwordUtils = require('../lib/password');
const Token = require('../lib/token');

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
                    // If User Exist....
                    
                    const hashedPassword = user.password;
                    //Check Is Password Is Matching Or Not..
                    passwordUtils.isMatched(password, hashedPassword)
                        .then(isMatched => {
                            if (isMatched) {
                                const message = 'Login Success';
                                const payLoad = Object.assign({}, user);
                                delete payLoad.password;
                                Token.generate(payLoad)
                                .then(token => done(null, token, { message: message }));
                            } else {
                                // IfPassword Was Not Matched.... Fail To Login
                                const message = 'Incorrect Password';
                                return done(null, false, { message: message });
                            }
                        })
                } else {
                    // If User Not Exist.... Fail To Login
                    const message = 'User Not Found';
                    return done(null, false, { message: message });
                }
            })
            .catch(done)
    }))
};
