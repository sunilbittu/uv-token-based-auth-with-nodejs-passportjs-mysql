'use strict';
const create = require('./create');
const find   = require('./find');
const update = require('./update');
const remove = require('./delete');

const User = {
	create: create,
	find: find,
	update: update,
	remove: remove
};

module.exports = User;