'use strict';
const should = require('chai').should();
const mockUser = {
    name: 'Manny',
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

    describe('User Registeration', () => {

        it('should create new user and return token', done => {
            request.post('/auth/register')
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

        it('should not return token', done => {
            request.post('/auth/register')
                .send(mockUser)
                .expect(200, { message: 'User Already Exist' })
                .end(done);
        })
        it('should send Missing credentials message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.email = 'xyzwronguser@gmail.com';
            wrongMockUser.name = undefined;

            request.post('/auth/register')
                .send(wrongMockUser)
                .expect(200)
                .end((error, res) => missingCredentialsTestHandler(error, res, done));
        })



        it('should send Missing credentials message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.email = 'xyzwronguser2@gmail.com';
            wrongMockUser.password = undefined;

            request.post('/auth/register')
                .send(wrongMockUser)
                .expect(200)
                .end((error, res) => missingCredentialsTestHandler(error, res, done));
        })

        it('should send Missing credentials message', done => {
            const wrongMockUser = Object.assign({}, mockUser);
            wrongMockUser.email = undefined;

            request.post('/auth/register')
                .send(wrongMockUser)
                .expect(200)
                .end((error, res) => missingCredentialsTestHandler(error, res, done));
        })




    });

};
