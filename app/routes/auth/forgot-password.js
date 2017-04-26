'use strict';
const sendMail = require('../../lib/send-mail');
const path = require('path');
const uuid = require('uuid');
const User = require(path.resolve('./app/db/user'));
const express = require('express');
const router = express.Router();

router.route('/')
    .post((req, res, next) => {

        const body = req.body || {};
        const email = body.email;
        const resData = {};

        function checkUserExist(user) {
            if (user) {
                const userId = user.id;
                const passwordResetId = uuid();
                User.update({ email: email }, { passwordResetId: passwordResetId })
                    .then(isUpdated => {
                        if (isUpdated) {
                            const subject = 'Click the link to reset your password';
                            const html = `<a href="http://localhost:3000/auth/reset-password/${userId}/${passwordResetId}">Click To Reset Your Password</a>`;
                            return sendMail(email, subject, html);
                        }
                    })
                    .then(info => {
                        // console.log(info);
                        resData.isSuccess = true;
                        resData.message = 'Password Reset Link Has Been Sent To Your Email.. Please Check It Out..'
                        res.json(resData);
                    })

            } else {
                resData.message = 'User Not Found';
                resData.isSuccess = false;
                res.json(resData);
            }
        }

        if (email) {
            User.find({ email: email })
                .then(checkUserExist)
                .catch(error => {
                    if (error) {
                        return next(error);
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
