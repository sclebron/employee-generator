const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Tigers',
    database: 'employee_db'
});

module.exports = connection;