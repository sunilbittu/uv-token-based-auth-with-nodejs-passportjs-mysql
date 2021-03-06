'use strict';
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/user');
const Token = require('../lib/token');

module.exports = passport => {

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        // console.log(email, password);
        const name = req.body.name;

        User.find({ email: email })
            .then(user => {
                if (user) {
                    // If User Alredy Exist....
                    if (!user.password) {
                        const updateOptions = {
                            name: name,
                            password: password
                        };

                        User.update({ userId: user.id }, updateOptions)
                            .then(isUpdated => {
                                if (isUpdated) {
                                    const payLoad = Object.assign({}, user);
                                    delete payLoad.password;
                                    return Token.generate(payLoad);
                                }
                            })
                            .then(token => {
                                if (token) {
                                    const message = 'Success';
                                    // console.log(message);
                                    return done(null, token, { message: message });
                                }
                            })
                    } else {
                        const message = 'User Already Exist';
                        // console.log(message);
                        return done(null, false, { message: message });
                    }
                } else {
                    // If User Not Exist.... Create New One...
                    const user = {
                        email: email,
                        password: password,
                        name: name
                    };

                    User.create(user, 'local')
                        .then(user => {
                            if (user) {
                                const payLoad = Object.assign({}, user);
                                delete payLoad.password;
                                return Token.generate(payLoad);
                            }
                        })
                        .then(token => {
                            if (token) {
                                const message = 'User Successfully Created';
                                // console.log(message);
                                return done(null, token, { message: message });
                            }
                        })
                        .catch(done);
                }
            })
            .catch(done)
    }))
};
