'use strict';
const path = require('path');
const config = require(path.resolve('./config')).Auth.fb;
const FacebookStrategy = require('passport-facebook').Strategy;
const fbConfig = {
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    profileFields: ['id', 'displayName', 'email']
};

const User = require('../db/user');
const Token = require('../lib/token');

module.exports = passport => {

    function createFbUser(email, fbId, fbName) {
        const user = {
            fbId: fbId,
            fbName: fbName,
            email: email
        };

        return User.create(user, 'fb');
    }

    function updateUser(userId, updateOptions) {
        return User.update({ userId: userId }, updateOptions)
    }

    passport.use('fb-login', new FacebookStrategy(fbConfig,
        (accessToken, refreshToken, profile, done) => {
            const fbId = profile.id;
            const fbName = profile.displayName;
            let email;
            const emails = profile.emails; // Array Of Objects contains emails..

            if (emails && emails.length > 0) {
                email = profile.emails[0].value;
            }

            User.find({ fbId: fbId })
                .then(fbUser => {
                    if (fbUser) {
                        return fbUser;
                    } else if (email) {
                        return User.find({ email: email })
                            .then(user => {
                                if (user) {
                                    const userId = user.id;
                                    const updateOptions = {
                                        fbId: fbId,
                                        fbName: fbName
                                    };
                                    return updateUser(userId, updateOptions)
                                        .then(isUpdated => {
                                            if (isUpdated) {
                                                user.fbid = fbId;
                                                user.fbname = fbName;
                                                return user;
                                            }
                                        })
                                } else {
                                    return createFbUser(email, fbId, fbName);
                                }
                            })
                    } else {
                        return createFbUser(email, fbId, fbName);
                    }
                })
                .then(user => {
                    const message = 'Success';
                    const payLoad = Object.assign({}, user);
                    delete payLoad.password;
                    Token.generate(payLoad)
                        .then(token => done(null, token, { message: message }));
                })
                .catch(done)

            // console.log(accessToken, refreshToken, profile);

        }
    ));


};
