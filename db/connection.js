// DEPENDENCIES
const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        // INSERT YOUR USER
        user: 'root',
        // INSERT YOUR PASSWORD
        password: process.env.PASS,
        database: 'employee_db'
    })

module.exports = db