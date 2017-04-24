'use strict';

const fb = {
    clientId: '',
    clientSecret: '',
    callbackURL: '/auth/facebook/callback'
};

const google = {
    clientId: '',
    clientSecret: '',
    callbackURL: '/auth/google/callback'
};

const jwt = {
    secret: 'Yuvaraj',
    tokenExpirePeriod: (60 * 60 * 2) //expire time in seconds or we can also use string like "2h";
}

const nodemailer = {
    user: 'friends2abilash@gmail.com',
    password: ''
};

const config = {
    fb: fb,
    google: google,
    jwt: jwt,
    nodemailer: nodemailer
};

module.exports = config;
