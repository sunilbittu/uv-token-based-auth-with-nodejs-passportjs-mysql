'use strict';
const passport = require('../../passport');
const express = require('express');
const router = express.Router();


router.route('/')
    .get(passport.authenticate('fb-login', { session: false, scope: ['email'] }));

router.route('/callback')
    .get((req, res, next) => {
        passport.authenticate('fb-login', { session: false }, (error, token, info) => {
            if (error) {
                console.log(error)
                return next(error);    
            } 

            if (token) {
                let resData = `
                <!DOCTYPE html><html><head></head><body>
                <mark>${token}</mark>
                <script>
                var token = ${token};
                sessionStorage.setItem('token', token);
                //location.href = '/#!/profile';
                </script>
                </body></html>
                `
                res.send(resData)
            } else {
                res.send('Sorry !')
            }                
            
        })(req, res, next);
    })

router.use((error, req, res, next) => {

    const message = 'Bad Request: ' + error.message;
    const resData = {
        message: message
    };

    res.status(200).json(resData);
})


module.exports = router;
