'use strict';
const path = require('path');
// const should = require('chai').should();
const supertest = require('supertest');
const truncateUserTable = require('./helper').truncateUserTable;


require(path.resolve('./server'));
const request = supertest('http://localhost:3000');

const authRouteTests = require('./auth');

function onAfterHandler (done) {
	truncateUserTable()
	.then(results => {
		done()
	})
}

describe('Server', () => {
	after(onAfterHandler);
    authRouteTests(request);
});
