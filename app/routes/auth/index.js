'use strict';
const express     = require('express');
const router      = express.Router();
const register    = require('./register');
const login       = require('./login');
const fbLogin     = require('./fb-login');
const googleLogin = require('./google-login');

// const AuthRoutes = { register, login, fbLogin, googleLogin };

router.use('/register', register);
router.use('/login', login);
router.use('/fb', fbLogin);
router.use('/google', googleLogin);

// module.exports = AuthRoutes
module.exports = router