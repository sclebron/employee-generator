const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    // dialect: 'mysql',
    user: 'root',
    password: 'Tigers',
    database: 'employees_db'
});

module.exports = db;