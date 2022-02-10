// DEPENDENCIES 
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

const db = require('./db/connection.js');

//-------------------------------------------------------------------------------------------------

// USE THE DB/CONNECTIONS.JS TO START THE SCHELL
db.connect(err => {
    if (err) throw err;
    console.log('STARTING APPLICATION')
    startQuestions();
});

const startQuestions = () => {
    inquirer.prompt ([
        {
            type: 'list',
            pageSize: 8,
            name: 'choices',
            message: 'What are you looking to accomplish?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'EXIT'
            ],
        }
    ])
}