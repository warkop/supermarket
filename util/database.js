const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'node-complete'
})

module.exports = pool.promise();