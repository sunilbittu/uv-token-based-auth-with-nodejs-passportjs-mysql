'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
let CONFIG_DIR;

if (NODE_ENV === 'production') {
	CONFIG_DIR = 'production';
} else if (NODE_ENV === 'development') {
	process.env.NODE_ENV = 'development';
	CONFIG_DIR           = 'development';
}
else if (NODE_ENV === 'test') {
	CONFIG_DIR = 'development';
} else {
	CONFIG_DIR = 'development';
}

const CONFIG_PATH = `./${CONFIG_DIR}/index`;
const config      = require(CONFIG_PATH);

module.exports    = config;