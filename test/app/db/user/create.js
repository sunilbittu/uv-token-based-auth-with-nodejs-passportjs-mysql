'use strict';
const should   = require('chai').should();
const path     = require('path');
const findUser = require(path.resolve('./app/db/user/index')).find;
const createUser        = require(path.resolve('./app/db/user/index')).create;
const truncateUserTable = require('./helper').truncateUserTable;

let mockUsers = {};
mockUsers.local = {
	name: 'mock user',
	email: 'mockuser@example.com',
	password: 'mockuser'
}

mockUsers.fb = {
	email: 'mockfbuser@example.com',
	fbId: 'mockfbuserid',
	fbName: 'mock fb user'
}


function onBeforeHandler (done) {
	truncateUserTable()
	.then(results => {
		done()
	})
}

function onAfterHandler (done) {
	truncateUserTable()
	.then(results => {
		done()
	})
}


module.exports = () => {
	describe('#Create', () => {

		before(onBeforeHandler);
		after(onAfterHandler);
		describe(':Local User', () => {

			function assertResponseForThrowingError (error, done) {
				error.should.be.an('error').and.not.to.be.null;
				done()
			}

			it('should create new local user, if user not exist', done => {
				const localMockUser = mockUsers.local;
				createUser(localMockUser, 'local')
				.then(resData => {
					resData.should.be.an('object').and.to.have.all.keys(['isSuccess', 'message', 'user']);
					resData.should.have.property('isSuccess').and.to.be.true;
					resData.should.have.property('message').and.to.equal('User Successfully Created');
					resData.should.have.property('user').and.not.to.be.null;
					done()
				});
			})

			it('should fail to create new local user, if user already exist', done => {
				const localMockUser = mockUsers.local;
				createUser(localMockUser, 'local')
				.then(resData => {
					resData.should.be.an('object').and.to.have.all.keys(['isSuccess', 'message', 'user']);
					resData.should.have.property('isSuccess').and.to.be.false;
					resData.should.have.property('message').and.to.equal('User Already Exist');
					resData.should.have.property('user').and.not.to.be.null;
					done()
				});
			})

			it('should throw error if local user name is missing', done => {
				const localMockUser = Object.assign({}, mockUsers.local);
				localMockUser.name  = ''; 
				createUser(localMockUser, 'local')
				.catch(error => assertResponseForThrowingError(error, done));
			});

			it('should throw error if local user email is missing', done => {
				const localMockUser = Object.assign({}, mockUsers.local);
				localMockUser.email  = ''; 
				createUser(localMockUser, 'local')
				.catch(error => assertResponseForThrowingError(error, done));
			});

			it('should throw error if local user password is missing', done => {
				const localMockUser = Object.assign({}, mockUsers.local);
				localMockUser.password  = ''; 
				createUser(localMockUser, 'local')
				.catch(error => assertResponseForThrowingError(error, done));
			});

			it('should throw error on passing empty object as localuser', done => {
				const localMockUser = {};
				createUser(localMockUser, 'local')
				.catch(error => assertResponseForThrowingError(error, done));
			});

			it('should throw error on passing invalid user type parameter', done => {
				const localMockUser = mockUsers.local;
				createUser(localMockUser, 'xyz')
				.catch(error => assertResponseForThrowingError(error, done));
			});

		});

		// Test Block For Fb User Creation 

		describe(':Fb User', () => {

			function assertResponseForSuccessfulFbUser (resData, done) {
				resData.should.be.an('object').and.to.have.all.keys(['isSuccess', 'message', 'user']);
				resData.should.have.property('isSuccess').and.to.be.true;
				resData.should.have.property('message').and.to.equal('Success');
				resData.should.have.property('user').and.not.to.be.null;
				done();
			}

			it('should throw error if fbId or fbName was not provided', done => {
				const localMockUser = mockUsers.local;
				createUser(localMockUser, 'fb')
				.catch(error => {
					error.should.be.an('error').and.not.to.be.null;
					done();
				})
			});

			it('should create new fb user if user with given fbid and email not exist', done => {
				const fbMockUser = mockUsers.fb;

				createUser(fbMockUser, 'fb')
				.then(resData => assertResponseForSuccessfulFbUser(resData, done))
				.catch(done);
			})

			it('should return user if user with given fbid already exist', done => {
				const fbMockUser = mockUsers.fb;
				createUser(fbMockUser, 'fb')
				.then(resData => assertResponseForSuccessfulFbUser(resData, done))
				.catch(done);
			})

			it('should update and return user if local user with given email exist but not fbid', done => {
				const localMockUser = Object.assign( {}, mockUsers.local);
				localMockUser.fbId  = 'xyz';
				localMockUser.fbName  = 'xyz name';
				createUser(localMockUser, 'fb')
				.then(resData => assertResponseForSuccessfulFbUser(resData, done))
				.catch(done);
			})

			it('should create and return new fb user even if email is not provided and user with fbid not already exist', done => {
				const newFbMockUser = {
					fbId: 'newfbuseridwithoutemail',
					fbName: 'mock fb user'
				};

				createUser(newFbMockUser, 'fb')
				.then(resData => assertResponseForSuccessfulFbUser(resData, done))
				.catch(done);
			})

			

		});

//


})


}
