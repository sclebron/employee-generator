const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tigers',
    database: 'employeesDB'
});

module.exports = db;