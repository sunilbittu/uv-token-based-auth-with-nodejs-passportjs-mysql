'use strict';
const express     = require('express');
const router      = express.Router();
const register    = require('./register');
const login       = require('./login');
const fbLogin     = require('./fb-login');
const googleLogin = require('./google-login');
const forgotPassword = require('./forgot-password');
const resetPassword = require('./reset-password');

// const AuthRoutes = { register, login, fbLogin, googleLogin };

router.use('/register', register);
router.use('/login', login);
router.use('/facebook', fbLogin);
router.use('/google', googleLogin);
router.use('/forgot-password', forgotPassword);
router.use('/reset-password', resetPassword);

// module.exports = AuthRoutes
module.exports = router