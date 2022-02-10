// DEPENDENCIES 
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

const db = require('./db/connection.js');

//-------------------------------------------------------------------------------------------------

// USE THE DB/CONNECTIONS.JS TO START THE SHELL
db.connect(err => {
    if (err) throw err;
    console.log('STARTING APPLICATION')
    startQuestions();
});

// ONCE INITIALIZED, ASK THE USER WHAT THEY WPOULD LIKE TO DO 
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
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'EXIT'
            ],
        }
    ])
    // THEN TAKE THAT ANSWER AND RUN IT'S RESPECTIVE FUNCTIONS
    .then((answers) => {
        const {choices} = answers;
        switch (choices) {
            case 'View All Departments':
                viewDepartments(); 
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add A Department':
                addDepartment()
            break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee()
                break;
            case 'Update An Employee Role':
                updateEmployee(); 
                break;
            case 'EXIT':
                process.exit(1);
        };
    });
};

//-------------------------------------------------------------------------------------------------
// FUNCTIONS RUN BY THE USER'S ANSWER 

// VIEW FUNCTIONS
viewDepartments = () => {
    const sql = `SELECT `
}; 

viewRoles = () => {

}; 

viewEmployees = () => {

}; 

// ADD FUNCTIONS
addDepartment = () => {

}; 

addRole= () => {

}; 

addEmployee= () => {

}; 
// EDIT FUNCTIONS
updateEmployee= () => {

}; 