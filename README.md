# Employee Tracker

I was tasked to create an interface that allows non-developers to easily view and interact with information stored in a databases. And so I built a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## Given: User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Given: Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Walkthrough Video

The following video shows an example of the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./Assets/video.png)](https://drive.google.com/file/d/1z5PXQ9NoqE7vkEqySHt15w6VVJ8Q7c6S/view)

## Usage
After cloning the repo, open a terminal inside the root of the application. There you will 'npm install' as to download all dependencies. After that, you much use mysql to initialize the database, as well as the schema.sql and seeds.sql files. After that is complete, you may start the application by simply inputting 'node index.js' in the terminal. 

I'll include an image of the database being initialized in mysql as an example of how to properly start the application. 
![An image of a terminal showcasing the proper use of mysql to start the database for the application.](./Assets/usage.gif)


## Bonus
As part of my application's bonus content, I added the following optional feature.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.

## Review

* Video of Application in Use: https://drive.google.com/file/d/1z5PXQ9NoqE7vkEqySHt15w6VVJ8Q7c6S/view 

* Github Repo: https://github.com/jaime-gg/employee-tracker 