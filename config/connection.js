const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Tigers',
    database: 'employees_db'
});

module.exports = db;