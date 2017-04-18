// 'use strict';
// const should       = require('chai').should();
// const path         = require('path');
// const User         = require(path.resolve('./app/db/user/index'));
// const exeQuery     = require(path.resolve('./app/db/lib/exe-query'));

// describe('User', () => {
// 	const user = {
// 		name: 'user',
// 		email: 'user@example.com',
// 		password: 'password'
// 	};

// 	const fbUser = {
// 		email: 'fbuser@example.com',
// 		fbName: 'fbuser',
// 		fbId: 'dghbf453tgb'
// 	};

// 	const unknownUser = {
// 		id: 'unknownid',
// 		fbName: 'unknownFbUser',
// 		fbId: 'unknownfbuserid',
// 		email: 'unknownuser@example.com',
// 		password: 'password'
// 	};



// 	/*
// 	*  Test Cases For Creating New User In DataBase
// 	*/

// 	describe('#Create', () => {
// 		it('should create new local user, if user not exist', done => {
// 			User.create(user, 'local')
// 			.then(resData => {
// 				resData.should.be.an('object').and.not.to.be.null;		
// 				resData.should.have.property('isSuccess').and.to.be.true;
// 				resData.should.have.property('user').and.not.to.be.null;
// 				user.id = resData.user.id;
// 				done()
// 			})
// 			.catch(done)
// 		})

// 		it('should fail to create user, if user already exist', done => {
// 			User.create(user, 'local')
// 			.then(resData => {
// 				resData.should.be.an('object').and.not.to.be.null;		
// 				resData.should.have.property('isSuccess').and.to.be.false;
// 				done()
// 			})
// 			.catch(done)
// 		})

// 		it('should create new fb user, if user not exist', done => {
// 			User.create(fbUser, 'fb')
// 			.then(resData => {
// 				// console.log(resData)
// 				resData.should.be.an('object')
// 				resData.should.have.property('isSuccess').and.to.be.true;
// 				resData.should.have.property('user').and.not.to.be.null;
// 				fbUser.id = resData.user.insertId;
// 				done()
// 			})
// 			.catch(done)
// 		})

// 		it('should return fbuser if user with given fbid exist', done => {
// 			User.create(fbUser, 'fb')
// 			.then(resData => {
// 				// console.log(resData)
// 				resData.should.be.an('object')
// 				resData.should.have.property('isSuccess').and.to.be.true;
// 				resData.should.have.property('user').and.not.to.be.null;
// 				done()
// 			})
// 			.catch(done)
// 		})

// 		it('should update and return user if user with given email exist but not fbuser', done => {
// 			const existingUser = Object.assign({}, user);
// 			existingUser.fbName = 'fbUser 2';
// 			existingUser.fbId = 'fbUserId2';
// 			User.create(existingUser, 'fb')
// 			.then(resData => {
// 				// console.log(resData)
// 				resData.should.be.an('object')
// 				resData.should.have.property('isSuccess').and.to.be.true;
// 				resData.should.have.property('user').and.not.to.be.null;
// 				done()
// 			})
// 			.catch(done)
// 		})
// 	})


//  	/*
// 	 * Tests Form Finding Users From Database 
// 	 */ 

// 	 describe('#Find', () => {
// 	 	it('should return user with given email', done => {
// 	 		User.find.byEmail(user.email)
// 	 		.then(result => {
// 				// console.log(user)
// 				result.should.be.an('array').with.lengthOf(1);
// 				result.should.have.property('0').not.to.be.null;
// 				done()
// 			})
// 	 		.catch(done)
// 	 	})

// 	 	it('should return user with given id', done => {
// 	 		User.find.byId(user.id)
// 	 		.then(result => {
// 				// console.log(user)
// 				result.should.be.an('array').with.lengthOf(1);
// 				result.should.have.property('0').not.to.be.null;
// 				done()
// 			})
// 	 		.catch(done)
// 	 	})

// 	 	it('should return user with given fbid', done => {
// 	 		User.find.byFbId(fbUser.fbId)
// 	 		.then(result => {
// 				// console.log(user)
// 				result.should.be.an('array').with.lengthOf(1);
// 				result.should.have.property('0').not.to.be.null;
// 				done()
// 			})
// 	 		.catch(done)
// 	 	})

// 	 	it('should return empty array if user with given email not exist', done => {
// 	 		User.find.byEmail(unknownUser.email)
// 	 		.then(result => {
// 				// console.log(user)
// 				result.should.be.an('array').with.lengthOf(0);
// 				done()
// 			})
// 	 		.catch(done)
// 	 	})

// 	 	it('should return empty array if user with given id not exist', done => {
// 	 		User.find.byId(unknownUser.id)
// 	 		.then(result => {
// 				// console.log(user)
// 				result.should.be.an('array').with.lengthOf(0);
// 				done()
// 			})
// 	 		.catch(done)
// 	 	})

// 	 	it('should return empty array if user with given fbid not exist', done => {
// 	 		User.find.byFbId(unknownUser.fbId)
// 	 		.then(result => {
// 				// console.log(user)
// 				result.should.be.an('array').with.lengthOf(0);
// 				done()
// 			})
// 	 		.catch(done)
// 	 	})

// 	 })


//  	/*
// 	 * Tests For Updating Users From Database 
// 	 */ 

// 	 describe('#Update', () => {

// 	 	it('should find user by email and update user email with new email', done => {
// 	 		const email = user.email;
// 	 		const newUserValues = { email: 'yuvaraj@gmail.com' }
// 	 		User.update.byEmail(email, newUserValues)
// 	 		.then(isUpdated => {
// 	 			isUpdated.should.be.true;
// 	 			if (isUpdated) user.email = newUserValues.email;
// 	 			done();
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 	it('should find user by email and update user name with new name', done => {
// 	 		const email = user.email;
// 	 		const newUserValues = { name: 'yuvaraj' }
// 	 		User.update.byEmail(email, newUserValues)
// 	 		.then(isUpdated => {
// 	 			isUpdated.should.be.true;
// 	 			done()
// 	 		})
// 	 		.catch(done)
// 	 	})


// 	 	it('should find user by email and update user password with new password', done => {
// 	 		const email = user.email;
// 	 		const newUserValues = { password: 'uvpassword' }
// 	 		User.update.byEmail(email, newUserValues)
// 	 		.then(isUpdated => {
// 	 			isUpdated.should.be.true;
// 	 			done()
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 	it('should find user by id and update user email with new email', done => {
// 	 		const id = user.id;
// 	 		const newUserValues = { email: 'somenewemail@gmail.com' }
// 	 		User.update.byId(id, newUserValues)
// 	 		.then(isUpdated => {
// 	 			isUpdated.should.be.true;
// 	 			if (isUpdated) user.email = newUserValues.email;
// 	 			done();
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 	it('should find user by id and update user name with new name', done => {
// 	 		const id = user.id;
// 	 		const newUserValues = { name: 'shivaraj' }
// 	 		User.update.byId(id, newUserValues)
// 	 		.then(isUpdated => {
// 	 			isUpdated.should.be.true;
// 	 			done()
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 	it('should find user by id and update user password with new password', done => {
// 	 		const id = user.id;
// 	 		const newUserValues = { password: 'uvpassword2' }
// 	 		User.update.byId(id, newUserValues)
// 	 		.then(isUpdated => {
// 	 			isUpdated.should.be.true;
// 	 			done()
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 });

// 	 /*
// 	 *  Test Cases For Removing Users From Db
// 	 */ 

// 	 describe('#Remove', () => {
// 	 	it('should find and remove user by id', done => {
// 	 		User.remove.byId(user.id)
// 	 		.then(isRemoved => {
// 	 			isRemoved.should.be.true;
// 	 			done()
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 	it('should find and remove user by email', done => {
// 	 		User.remove.byEmail(fbUser.email)
// 	 		.then(isRemoved => {
// 	 			isRemoved.should.be.true;
// 	 			done()
// 	 		})
// 	 		.catch(done)
// 	 	})

// 	 });


// 	 after(done => {
// 	 	exeQuery('TRUNCATE TABLE users')
// 	 	.then(result => {
// 			// console.log(result)
// 			done()
// 		})
// 	 	.catch(done)
// 	 })

// 	});
