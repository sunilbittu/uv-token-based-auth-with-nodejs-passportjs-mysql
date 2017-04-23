'use strict';
const should = require('chai').should();
const path = require('path');
const removeUser = require(path.resolve('./app/db/user/index')).remove;
const createMockUsers = require('./helper').createMockUsers;
const truncateUserTable = require('./helper').truncateUserTable;

let mockUsers;

function onBeforeHandler(done) {
    createMockUsers()
        .then(users => {
            mockUsers = users;
            // console.log(mockUsers)
            done()
        })
}

function onAfterHandler(done) {
    truncateUserTable()
        .then(results => {
            done()
        })
}


module.exports = () => {
    describe('#Delete', () => {

        function assertResponseForThrowingError(error, done) {
            error.should.be.an('error').and.not.to.be.null;
            done()
        }

        function assertionOnSuccesfulDeletion(resData, done) {
            resData.should.be.true;
            done();
        }

        function assertionOnFailedToDelete(resData, done) {
            resData.should.be.false;
            done();
        }

        before(onBeforeHandler);
        after(onAfterHandler);

        it('should throw an error if query is empty', done => {
            removeUser(null)
                .catch(error => assertResponseForThrowingError(error, done))
        })

        it('should throw an error if query is invalid', done => {
            removeUser({ xyz: 'abc@gmail.com' })
                .catch(error => assertResponseForThrowingError(error, done))
        })

        it('should return true if user with given userId deleted successfully', done => {
            removeUser({ userId: 2 })
                .then(resData => assertionOnSuccesfulDeletion(resData, done))
                .catch(done);
        })

        it('should return true if user with given email deleted successfully', done => {
            removeUser({ email: 'user1@example.com' })
                .then(resData => assertionOnSuccesfulDeletion(resData, done))
                .catch(done);
        })

        it('should return true if user with given gmail deleted successfully', done => {
            removeUser({ email: 'googleuser1@gmail.com' })
                .then(resData => assertionOnSuccesfulDeletion(resData, done))
                .catch(done);
        })

        it('should return false if user with given email not exist', done => {
            removeUser({ email: 'xyz@example.com' })
                .then(resData => assertionOnFailedToDelete(resData, done))
                .catch(done);
        })

        it('should return false if user with given userId not exist', done => {
            removeUser({ userId: 2434254554 })
                .then(resData => assertionOnFailedToDelete(resData, done))
                .catch(done);
        })


    })
}
