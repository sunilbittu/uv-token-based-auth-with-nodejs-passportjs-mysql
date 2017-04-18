'use strict';
const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const app        = express();
const PORT       = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('www'));

require('./app/routes/index')(app);

app.listen(PORT, () => console.log('Server Is Up And Running On Port %d', PORT));

if (process.env.NODE_ENV === 'test') {
	module.exports = app;
}