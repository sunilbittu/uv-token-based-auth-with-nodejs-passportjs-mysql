'use strict';
const pool        = require('./lib/pool');
const tableSetups = require('./tables/index');

tableSetups
.then(isAllOk => {
	console.log(isAllOk);
	pool.end(function (error) {
		console.log(error)
  // all connections in the pool have ended
});
})
.catch(error => console.log(error));