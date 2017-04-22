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
// const passwordUtils = require('../lib/password');
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
        return User.update({ userId: userId })
    }

    passport.use('google-login', new GoogleStrategy(googleConfig,
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken)
            const googleId = profile.id;
            const googleName = profile.displayName;
            const emails = profile.emails; // Array Of Objects contains emails..
            const photos = profile.photos; // Array Of Objects contains profile pic urls..

            let email;
            let googleProPic;

            if (emails && emails.length > 0) {
                email = profile.emails[0].value;
            }

            if (photos && photos.length > 0) {
                photo = profile.photos[0].value;
            }
            

            // User.find({ fbId: fbId })
            //     .then(fbUser => {
            //         if (fbUser) {
            //             return fbUser;
            //         } else if (email) {
            //             return User.find({ email: email })
            //                 .then(user => {
            //                     if (user) {
            //                         const userId = user.id;
            //                         const updateOptions = {
            //                             fbId: fbId,
            //                             fbName: fbName
            //                         };
            //                         return updateUser(userId, updateOptions)
            //                             .then(isUpdated => {
            //                                 if (isUpdated) {
            //                                     user.fbid = fbId;
            //                                     user.fbname = fbName;
            //                                     return user;
            //                                 }
            //                             })
            //                     } else {
            //                         return createFbUser(email, fbId, fbName);
            //                     }
            //                 })
            //         } else {
            //             return createFbUser(email, fbId, fbName);
            //         }
            //     })
            //     .then(user => {
            //         const message = 'Success';
            //         const payLoad = Object.assign({}, user);
            //         payLoad.password = undefined;
            //         Token.generate(payLoad)
            //             .then(token => done(null, token, { message: message }));
            //     })
            //     .catch(done)

            // console.log(accessToken, refreshToken, profile);

        }
    ));


};
