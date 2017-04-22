'use strict';
const exeQuery = require('../lib/exe-query');
const passwordUtil = require('../lib/password');

function createLocalUser(email, password, name) {

    const isOK = (email && name && password);

    if (isOK) {
        const user = {
            email: email,
            name: name
        };

        return passwordUtil.hash(password)
            .then(passwordHash => {
                user.password = passwordHash;
                const SQLQuery = 'INSERT INTO users SET ?';
                return exeQuery(SQLQuery, user);
            })
            .then(results => {
                user.id = results.insertId;
                return user;
            })

    } else {
        const error = new Error('Should Provide Email, Password And Name');
        return Promise.reject(error);
    }

}

function createFbUser(email, fbId, fbName) {

    const isOK = fbId && fbName; // Minimum Requirement To Proceed Further..

    if (isOK) {
        const user = {
            fbid: fbId,
            fbname: fbName
        };

        if (email) {
            user.email = email;
        }

        const SQLQuery = 'INSERT INTO users SET ?';

        return exeQuery(SQLQuery, user)
            .then(results => {
                user.id = results.insertId;
                return user;
            })

    } else {
        const error = new Error('Something Went Wrong.. Failed To Fullfill Requirements Of Fb Login');
        return Promise.reject(error);
    }
}

function createGoogleUser(gmail, googleId, googleName) {

	const isGmail = gmail && (gmail.split('@')[1] === 'gmail.com'); // Check Whether Provided Email Is Gmail Or Not
    const isOK = isGmail && googleId && googleName; // Minimum Requirement To Proceed Further..

    if (isOK) {
        const user = {
        	gmail: gmail,
            googleid: googleId,
            googlename: googleName
        };

        const SQLQuery = 'INSERT INTO users SET ?';

        return exeQuery(SQLQuery, user)
            .then(results => {
                user.id = results.insertId;
                return user;
            })

    } else {
        const error = new Error('Something Went Wrong.. Failed To Fullfill Requirements Of Fb Login');
        return Promise.reject(error);
    }
}


function create(User = {}, typeOfUser) {
    const email = User.email;

    if (typeOfUser === 'local') {
        const name = User.name;
        const password = User.password;
        return createLocalUser(email, password, name);

    } else if (typeOfUser === 'fb') {
        const fbId = User.fbId;
        const fbName = User.fbName;
        return createFbUser(email, fbId, fbName);
    } else if (typeOfUser === 'google') {
        const googleId = User.googleId;
        const googleName = User.googleName;
        const email = User.email;
        return createGoogleUser(email, googleId, googleName);
    } else {
        const error = new Error('Invalid User Type');
        return Promise.reject(error);
    }
}

module.exports = create;
