'use strict';
const path = require('path');
const config = require(path.resolve('./config')).Auth.google;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = {
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
};

const User = require('../db/user');
const Token = require('../lib/token');

module.exports = passport => {

    function createGoogleUser(email, googleId, googleName) {
        const user = {
            googleName: googleName,
            googleId: googleId,
            gmail: email
        };

        return User.create(user, 'google');
    }

    function updateUser(userId, updateOptions) {
        return User.update({ userId: userId }, updateOptions)
    }

    passport.use('google-login', new GoogleStrategy(googleConfig,
        (accessToken, refreshToken, profile, done) => {

            const googleId = profile.id;
            const googleName = profile.displayName;
            const emails = profile.emails; // Array Of Objects contains emails..
            const photos = profile.photos; // Array Of Objects contains profile pic urls..

            let email;
            let photo;

            if (emails && emails.length > 0) {
                email = profile.emails[0].value;
            }

            if (photos && photos.length > 0) {
                photo = profile.photos[0].value;
            }

            User.find({ email: email })
                .then(user => {
                    if (user) {
                      
                        const isPerfectGoogleUser = user.googleid;
                        if (isPerfectGoogleUser) {
                            return user;
                        } else {
                            const userId = user.id;
                            const updateOptions = {
                                googleId: googleId,
                                googleName: googleName,
                                gmail: email
                            };

                            return updateUser(userId, updateOptions)
                                .then(isUpdated => {
                                    if (isUpdated) {
                                        const googleUser = Object.assign({}, user);
                                        googleUser.googleid = googleId;
                                        googleUser.googlename = googleName;
                                        googleUser.gmail = email;
                                        return googleUser;
                                    }
                                })
                        }

                    } else {
                        return createGoogleUser(email, googleId, googleName)
                    }
                })
                .then(user => {
                    const message = 'Success';
                    const payLoad = Object.assign({}, user);
                    delete payLoad.password;
                    Token.generate(payLoad)
                        .then(token => done(null, token, { message: message }));
                })
                .catch(done);
        }
    ));


};
