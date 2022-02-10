// DEPENDENCIES 
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

const db = require('./db/connection.js');

//-------------------------------------------------------------------------------------------------

// USE THE DB/CONNECTIONS.JS TO START THE SCHELL
db.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    startQuestions();
});