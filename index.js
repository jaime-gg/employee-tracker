// DEPENDENCIES 
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    startQuestions();
});