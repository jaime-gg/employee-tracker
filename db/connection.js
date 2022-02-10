// dependencies
const mysql = require("mysql2/promise");
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: root,
        // Your MySQL password
        password: process.env.PASS,
        database: 'company'
    })

module.exports = db