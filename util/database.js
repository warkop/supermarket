const mysql = require('mysql2');

const pool = mysql.PoolConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-complete'
})

module.exports = pool.promise();