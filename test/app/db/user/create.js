'use strict';
const should   = require('chai').should();
const path     = require('path');
// const findUser = require(path.resolve('./app/db/user/index')).find;
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

		// before(onBeforeHandler);
		// after(onAfterHandler);
		describe(':Local User', () => {
			// beforeEach(onBeforeHandler);
			before(onBeforeHandler);
			after(onAfterHandler);

			function assertResponseForThrowingError (error, done) {
				error.should.be.an('error').and.not.to.be.null;
				done()
			}

			it('should create new local user', done => {
				const localMockUser = Object.assign({}, mockUsers.local);

				createUser(localMockUser, 'local')
				.then(user => {
					user.should.be.an('object').and.to.have.all.keys(['email', 'name', 'password', 'id']);
					done();
				})
			})

			it('should throw error if local user name is missing', done => {
				const localMockUser = Object.assign({}, mockUsers.local);
				localMockUser.name  = ''; 
				createUser(localMockUser, 'local')
				.catch(error => assertResponseForThrowingError(error, done));
			});

			it('should throw error if local user email is missing', done => {
				const localMockUser = Object.assign({}, mockUsers.local);
				localMockUser.email = ''; 
				createUser(localMockUser, 'local')
				.catch(error => assertResponseForThrowingError(error, done));
			});

			it('should throw error if local user password is missing', done => {
				const localMockUser    = Object.assign({}, mockUsers.local);
				localMockUser.password = ''; 
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

			before(onBeforeHandler);
			after(onAfterHandler);

			it('should throw error if fbId or fbName was not provided', done => {
				const localMockUser = Object.assign( {}, mockUsers.local );
				createUser(localMockUser, 'fb')
				.catch(error => {
					error.should.be.an('error').and.not.to.be.null;
					done();
				})
			});

			it('should create new fb user', done => {
				const fbMockUser = Object.assign( {}, mockUsers.fb );
				createUser(fbMockUser, 'fb')
				.then(user => {
					user.should.be.an('object').and.to.have.all.keys(['email', 'fbname', 'fbid', 'id']);
					done();
				})
				.catch(done);
			})

			it('should create new fb user without email id', done => {
				const fbMockUser = Object.assign( {}, mockUsers.fb );
				fbMockUser.email = '';
				createUser(fbMockUser, 'fb')
				.then(user => {
					user.should.be.an('object').and.to.have.all.keys(['fbname', 'fbid', 'id']);
					done();
				})
				.catch(done);
			})				

		});

})


}
