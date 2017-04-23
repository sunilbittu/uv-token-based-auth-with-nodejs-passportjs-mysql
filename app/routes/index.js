'use strict';
const Token = require('../lib/token');
const AuthRouter = require('./auth'); // Authentication and ACL routes
const userRouter = require('./user');

function isAuthorized(req, res, next) {
    const token = req.headers.Authorization || req.headers['x-access-token'];
    if (token) {
        Token.verify(token)
            .then(decodedToken => {
                req.userId = decodedToken.id;
                console.log('userId: %s', req.userId);
                return next();
            })
            .catch(error => {
                return res.status(403).json({
                    message: 'Unauthorized Access',
                    success: false
                })
            })
    } else {
        return res.status(403).json({
            message: 'Unauthorized Access',
            success: false
        })
    }
}


module.exports = app => {
    app.use('/auth/', AuthRouter);
    app.use('/api/*', isAuthorized); //Should Be Authorised To Access /api/* paths of server
    app.use('/api/user', userRouter)
}
