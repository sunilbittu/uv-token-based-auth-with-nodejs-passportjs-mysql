'use strict';
const sendMail = require('../../lib/send-mail');
const path = require('path');
const uuid = require('uuid');
const User = require(path.resolve('./app/db/user'));
const express = require('express');
const router = express.Router();

router.route('/:userId/:passwordResetId')
    .get((req, res, next) => {
        res.sendFile(path.resolve('./app/views/password-reset.html'))
    })

.post((req, res, next) => {
    const userId = req.params.userId;
    const passwordResetId = req.params.passwordResetId;
    const body = req.body || {};
    const password = body.password;
    const cPassword = body.cpassword;

    if (password === cPassword) {
        const query = { userId: userId };
        User.find(query)
        .then(user => {
            if (user.password_reset_id === passwordResetId) {
                User.update(query, { password: password, passwordResetId: null })
                .then(isUpdated => {
                    if (isUpdated) {
                        res.redirect('/');
                    }
                })
            }
        })
    }

})


router.use((error, req, res, next) => {

    const message = 'Bad Request: ' + error.message;
    const resData = {
        message: message
    };

    res.status(200).json(resData);
})


module.exports = router;
