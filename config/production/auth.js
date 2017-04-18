'use strict';

const fb = {
	clientId: '',
	clientSecret: ''
};

const google = {
	clientId: '',
	clientSecret: ''
};

const jwt = {
	secret: 'Yuvaraj',
    tokenExpirePeriod: (60 * 60 * 2) //expire time in seconds or we can also use string like "2h";
}

const config = {
	fb: fb,
	google: google,
	jwt: jwt
}

module.exports = config;