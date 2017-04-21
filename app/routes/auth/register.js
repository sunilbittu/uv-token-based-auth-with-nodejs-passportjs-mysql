'use strict';
const passport = require('../../passport');
const express = require('express');
const router = express.Router();

router.route('/')
    .post((req, res, next) => {
        passport.authenticate('register', { session: false }, (error, token, info) => {
            if (error) {
                return next(error);
            }

            const resData = {};
            resData.message = info.message;
            if (token) {
                resData.token = token;
            }

            // console.log(token)

            res.json(resData);

        })(req, res, next);
    })


router.use((error, req, res, next) => {

    const message = 'Bad Request: ' + error.message + ' :Missing credentials'; 
    const resData = {
        message: message
    };

    res.status(200).json(resData);
})


module.exports = router;
