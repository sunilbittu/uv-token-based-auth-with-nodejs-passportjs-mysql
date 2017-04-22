'use strict';
const should   = require('chai').should();
const path     = require('path');
const updateUser = require(path.resolve('./app/db/user/index')).update;
const createMockUsers   = require('./helper').createMockUsers;
const truncateUserTable = require('./helper').truncateUserTable;

let mockUsers;

function onBeforeHandler (done) {
	createMockUsers()
	.then(users => {
		mockUsers = users;
		// console.log(mockUsers)
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
	describe('#Update', () => {

		function assertResponseForThrowingError (error, done) {
			error.should.be.an('error').and.not.to.be.null;
			done()
		}

		function assertionOnSuccesfulUpdation (resData, done) {
			resData.should.be.true;
			done();
		}

		function assertionOnFailedToUpdate (resData, done) {
			resData.should.be.false;
			done();
		}

		before(onBeforeHandler);
		after(onAfterHandler);

		it('should throw an error if query is empty', done => {
			updateUser(null, {email: 'newupdatedemail@example.com'})
			.catch(error => assertResponseForThrowingError(error, done))
		})

		it('should throw an error if updateOptions are empty', done => {
			updateUser({ email: 'user1@example.com' }, null)
			.catch(error => assertResponseForThrowingError(error, done))
		})

		it('should throw an error on invalid updateOptions', done => {
			updateUser({ email: 'user1@example.com' }, {xyz: 'abc@gmail.com'})
			.catch(error => assertResponseForThrowingError(error, done))
		})

		it('should throw an error on invalid query', done => {
			updateUser({ xyz: 'user1@example.com' }, {email: 'abc@gmail.com'})
			.catch(error => assertResponseForThrowingError(error, done))
		})

		it('should return true if user with given email updated successfully', done => {
			updateUser({ email: 'user1@example.com' }, { password: 'abcdefghijk', name: 'muser1' })
			.then(resData => assertionOnSuccesfulUpdation(resData, done));
		})

		it('should return false if user with given email not exist', done => {
			updateUser({ email: 'xyz@example.com' }, { password: 'abcdefghijk', name: 'muser1' })
			.then(resData => assertionOnFailedToUpdate(resData, done));
		})

		it('should return true if user with given userId updated successfully', done => {
			updateUser({ userId: 1 }, { password: 'abcdefghijk', name: 'muser1' })
			.then(resData => assertionOnSuccesfulUpdation(resData, done));
		})

		it('should return false if user with given userId not exist', done => {
			updateUser({ userId: 2434254554 }, { password: 'abcdefghijk', name: 'muser1' })
			.then(resData => assertionOnFailedToUpdate(resData, done));
		})

		// Checks For Fb Details Updation..
		it('should return true if user with given email updated successfully with given fb details', done => {
			updateUser({ email: 'user1@example.com' }, { fbId: 'fbidxyz', fbName: 'fbUserxyz' })
			.then(resData => assertionOnSuccesfulUpdation(resData, done))
			.catch(done);
		})

	})
}
