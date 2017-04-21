'use strict';
const should = require('chai').should();
const mockUser = {
    email: 'mockuser@example.com',
    password: 'mockuser'
}

function missingCredentialsTestHandler(error, res, done) {
    if (error) return done(error);
    res.body.should.be.an('object');
    res.body.should.not.have.property('token');
    res.body.should.have.property('message').and.to.be.a('string');
    done();
}

module.exports = request => {

    describe('User Login', () => {

        it('should return token and success message', done => {
            request.post('/auth/login')
                .send(mockUser)
                .expect(200)
                .end(function(error, res) {
                    if (error) return done(error);
                    res.body.should.be.an('object');
                    res.body.should.have.property('token').and.to.be.a('string');
                    res.body.should.have.property('message').and.to.be.a('string');
                    done();
                });
        })

        it('should not return token and should send wrong password message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.password = 'xyz';
            request.post('/auth/login')
                .send(wrongMockUser)
                .expect(200, { message: 'Incorrect Password' })
                .end(done);
        })

        it('should not return token and should send user not found message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.email = 'xyz@gmail.com';
            request.post('/auth/login')
                .send(wrongMockUser)
                .expect(200, { message: 'User Not Found' })
                .end(done);
        })

        it('should not return token and should send missing credentials message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.password = undefined;
            request.post('/auth/login')
                .send(wrongMockUser)
                .expect(200)
                .end((error, res) => missingCredentialsTestHandler(error, res, done));
        })
        it('should not return token and should respond with missing credentials message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.email = undefined;
            request.post('/auth/login')
                .send(wrongMockUser)
                .expect(200)
                .end((error, res) => missingCredentialsTestHandler(error, res, done));
        })

    });

};
