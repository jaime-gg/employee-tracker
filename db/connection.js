// dependency 
const mysql = require("mysql2/promise");

const db = mysql.createConnection(
        {
            host: 'localhost',
            // Your MySQL username,
            user: root,
            // Your MySQL password
            password: ,
            database: 'company'
        })


module.exports = db