'use strict';
const should   = require('chai').should();
const path     = require('path');

const generateToken = require(path.resolve('./app/lib/token')).generate;
const verifyToken   = require(path.resolve('./app/lib/token')).verify;

const mockPayload = {
	id: 1,
	email: 'user@example.com',
	name: 'mock user'
};
let token ;

describe('Token', () => {

	function assertResponseForThrowingError (error, done) {
			error.should.be.an('error').and.not.to.be.null;
			done()
		}
describe('#Generation', () => {
	it('should generate token for given data', done => {
		generateToken(mockPayload)
		.then(token => {
			token.should.be.a('string').and.not.to.be.empty;
			done();
		})
	})

	it('should throw an error if null is passes as payload', done => {
		generateToken(null)
		.catch(error => assertResponseForThrowingError(error, done))
	})

	it('should throw an error if type of payload is other than object', done => {
		generateToken('xyz')
		.catch(error => assertResponseForThrowingError(error, done))
	})

});

describe('#Verification', () => {
	it('should verify and return decoded token if token is valid', done => {
		generateToken(mockPayload)
		.then(verifyToken)
		.then(decodedToken => {
			decodedToken.should.be.an('object').and.not.to.be.empty;
			done();
		})
	})

	it('should throw an error if token is empty', done => {
		verifyToken()
		.catch(error => assertResponseForThrowingError(error, done))
	})


});
	
});