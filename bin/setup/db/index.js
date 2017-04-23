'use strict';
const pool = require('./lib/pool');
const tableSetups = require('./tables');

pool.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
        if (error.code === 'ER_BAD_DB_ERROR') {
            console.log(error.message);
            console.log('It Seems That Database You Are Requested Not Exist.. Please Create New One.. And Try Angain')
        } else {
        	console.log(error);
        }

        return process.exit(1);
    }

    console.log(results)

    tableSetups()
        .then(isAllOk => {
            console.log(isAllOk);
            pool.end(error => {
                if (error) return console.log(error)
                    // all connections in the pool have ended
            });
        })
        .catch(error => console.log(error));
})
