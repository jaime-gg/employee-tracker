// DEPENDENCIES 
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

const db = require('./db/connection.js');

//-------------------------------------------------------------------------------------------------

// USE THE DB/CONNECTIONS.JS TO START THE SHELL
db.connect(err => {
    if (err) throw err;
    startQuestions();
});

// ONCE INITIALIZED, ASK THE USER WHAT THEY WOULD LIKE TO DO 
const startQuestions = () => {
    inquirer.prompt ([
        {
            type: 'list',
            pageSize: 9,
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
                'View Department Budgets',
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
            case 'View Department Budgets':
                budgetSum(); 
                break;
            case 'EXIT':
                process.exit(1);
        };
    });
};

//------------------------------------------------------------------------------------------------- 
// VIEW FUNCTIONS
viewDepartments = () => {
    const sql = `
                SELECT * 
                FROM department
                `

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.log("=========================")
        console.table(rows);
        console.log("=========================");

        startQuestions();
    });
}; 

viewRoles = () => {
    const sql = `
                SELECT r.id, r.title, r.salary, department.name AS department_name 
                FROM role r
                LEFT JOIN department ON department.id = r.department_id
                `

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.log("=======================================================")
        console.table(rows);
        console.log("=======================================================");

        startQuestions();
    });
}; 

viewEmployees = () => {
    const sql = `
                SELECT e.id, 
                       CONCAT (e.first_name, " ", e.last_name) AS employee,
                       department.name AS department,
                       role.title,
                       role.salary,
                       CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee e
                LEFT JOIN role ON e.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON e.manager_id = manager.id
                
                `

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.log("=======================================================================================")
        console.table(rows);
        console.log("=======================================================================================");

        startQuestions();
    });
}; 

//------------------------------------------------------------------------------------------------- 
// ADD/EDIT FUNCTIONS


addDepartment = () => {
    inquirer.prompt([
        {
          type: 'input', 
          name: 'newDepartment',
          message: "What department would you like to add?",
          validate: newDepartment => {
            if (newDepartment) {
                return true;
            } else {
                console.log('Please enter a new department name');
                return false;
            }
          }
        }
    ])
    .then((answer) => {
        const sql = `
                    INSERT INTO department (name)
                    VALUES (?)
                    `
        db.query (sql, answer.newDepartment, (err, result) => {
            if (err) throw err;

            viewDepartments();
        });
    });
}; 

addRole = () => {
    const getData = `SELECT * FROM department`
    db.query(getData, (err, results) => {
        if (err) throw err;
        //console.log(results)

        inquirer.prompt([
            {
            type: 'input', 
            name: 'title',
            message: "What is the title of the new role?",
            validate: title => {
                if (title) {
                    return true;
                } else {
                    console.log('Please enter a new role title');
                    return false;
                }
            }
            },
            {
            type: 'number', 
            name: 'salary',
            message: "What will be their salary?",
            validate: salary => {
                if(typeof salary === "number" &&  salary >  1){
                    return true
                }
                console.log("Please enter a valid Salary using numbers higher than 1")
                return false
            }
            },
            {
                message: "In what department is this role?",
                name:"department_id",
                type: "list",
                choices: results.map(item=>{
                        return {name: item.name, value:item.id}
                    })
            }
        ])
        .then(answer => {
            const {title, salary, department_id} = answer
            const params = [title, salary, department_id]
            const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?)`;

            db.query(sql, params, (err, result) => {
                if (err) throw err;
                viewRoles();
            })
        })
    })
}; 

addEmployee = () => {
                    //any alternatives to union operators since requires similar info
    const getData = `SELECT role.id, role.title, employee.first_name, employee.last_name
                     FROM role 
                     LEFT JOIN employee on role.id = employee.role_id
                     `
    db.query(getData, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                message: 'What is their first name?',
                name: 'firstName',
                type: 'input',
                validate: (firstName) => {
                    if (firstName) {
                        return true
                    }
                    console.log("Please enter a valid name.")
                    return false
                }

            },
            {
                message: 'What is their last name?',
                name: 'lastName',
                type: 'input',
                validate: (lastName) => {
                    if (lastName) {
                        return true
                    }
                    console.log("Please enter a valid surname.")
                    return false
                }
                
            },
            {
                message: 'What is their role title?',
                name: 'role_id',
                type: 'list',
                choices: results.map(item => {
                    return {name: item.title, value: item.id}
                }),
            },
            {
                message: 'Who is their manager?',
                name: 'manager_id',
                type: 'list',
                loop: false,
                pageSize: 12,
                choices: results.map(item => {
                    return {name: item.first_name + " " + item.last_name, value: item.id}
                }),

            }
        ]).then((answer) => {
            const {firstName, lastName, role_id, manager_id} = answer
            const params = [firstName, lastName, role_id, manager_id]

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                         VALUES (?, ?, ?, ?)`
            db.query(sql, params, (err, result) => {
                if (err) throw err;
                viewEmployees();
            })
        })
    })
}


// EDIT FUNCTIONS
updateEmployee= () => {
                // SELECT * FROM roles and SELECT * FROM departments
    const sql = `SELECT role.id AS job, role.title, employee.id ,employee.first_name, employee.last_name
                FROM role 
                LEFT JOIN employee on role.id = employee.role_id
                `
    db.query(sql, (err, results) => {
        if (err) throw err; 

        inquirer.prompt([
            {
                message: "Who's role would you like to update?",
                name: 'employee',
                type: 'list',
                loop: false,
                pageSize: 12,
                
                choices: results.map(item => {
                    return {name: item.first_name + " " + item.last_name, value: item.id}
                })
            },
            {
                message: "What role will they be taking?",
                name: 'updatedRole',
                type: 'list',
                loop: false,
                pageSize: 12,
                choices: results.map(item => {
                    return {name: item.title, value: item.job}
                })
            }
        ]).then((answer) => {
            const {employee, updatedRole} = answer
            const params = [updatedRole, employee]
            console.log(params)

            const sql = `UPDATE employee
                         SET role_id = ?
                         WHERE id = ?;  
                        `
            db.query(sql, params, (err, result) => {
                if (err) throw err;
                viewEmployees();
            })
        })
    })
}; 
 
//------------------------------------------------------------------------------------------------- 
// BONUS CONTENT 

// VIEW ALL DEPARTMENT BUDGETS
budgetSum = () => {
 const sql = `SELECT department_id AS id, 
                     department.name AS department,
                     SUM(salary) AS budget
              FROM  role  
              JOIN department ON role.department_id = department.id GROUP BY department_id`;
    
    db.query(sql, (err, rows) => {
      if (err) throw err; 

      console.log("=======================================================")
      console.table(rows);
      console.log("=======================================================");

      startQuestions(); 
    });            
  };