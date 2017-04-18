'use strict';
const config = {};
const Auth   = require('./auth');
const DB     = require('./db');

config.Auth = Auth;
config.DB   = DB;

module.exports = config;