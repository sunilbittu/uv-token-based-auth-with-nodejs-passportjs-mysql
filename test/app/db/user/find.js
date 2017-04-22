'use strict';
const should = require('chai').should();
const path = require('path');
const findUser = require(path.resolve('./app/db/user/index')).find;
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
    describe('#Find', () => {

        before(onBeforeHandler);
        after(onAfterHandler);

        it('should return user with given email', done => {
            const email = mockUsers[0].email;
            const query = { email: email };
            findUser(query)
                .then(user => {
                    user.should.be.an('object').and.not.to.be.null;
                    done();
                })
                .catch(done)
        });

        it('should return user with given gmail', done => {
            const email = 'googleuser1@gmail.com';
            const query = { email: email };
            findUser(query)
                .then(user => {
                    user.should.be.an('object').and.not.to.be.null;
                    done();
                })
                .catch(done)
        });

        it('should return user with given user id', done => {
            const query = { userId: 1 };
            findUser(query)
                .then(user => {
                    user.should.be.an('object').and.not.to.be.null;
                    done();
                })
                .catch(done)
        });

        it('should return user with given facebook id', done => {
            const query = { fbId: 'fbid1' };
            findUser(query)
                .then(user => {
                    user.should.be.an('object').and.not.to.be.null;
                    done();
                })
                .catch(done)
        });

        it('should return null if no user exist with given email', done => {
            const mockUser = { email: 'abcd@xyz.com' };
            findUser(mockUser)
                .then(user => {
                    should.not.exist(user);
                    done();
                })
                .catch(done)
        });

        it('should return null if no user exist with given user id', done => {
            const query = { userId: 123443856 };
            findUser(query)
                .then(user => {
                    should.not.exist(user);
                    done();
                })
                .catch(done)
        });

        it('should return null if no user exist with given facebook id', done => {
            const query = { fbId: 'fbidxyz' };
            findUser(query)
                .then(user => {
                    should.not.exist(user);
                    done();
                })
                .catch(done)
        });

        it('should throw error if query is not valid', done => {
            const query = { xyz: 'fbidxyz' };
            findUser(query)
                .catch(error => {
                    error.should.be.an('error').and.not.to.be.null;
                    done()
                })
        });

    })
}
