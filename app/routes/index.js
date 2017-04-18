'use strict';
const AuthRouter = require('./auth/index'); // Authentication and ACL routes
const userRouter = require('./user/index');

function isAuthorized (req, res, next) {

}

module.exports = app => {
	app.use('/auth/', AuthRouter);
    // app.use('/api/*', isAuthorized); //Should Be Authorised To Access /api/* paths of server
    app.use('/api/user', userRouter)
}