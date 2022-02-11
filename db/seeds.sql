-- FILE THAT CONTAINES THE VALUES INSERTED INTO THE GIVEN TABLES -- 

INSERT INTO department (name)
VALUES
('IT'),
('Sales'),
('Accounting'),
('Human Resources');


INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 70000, 1),
('Full Stack Web Developer', 75000, 1),
('Sales Associate', 70000, 2),
('Sales Manager', 75000, 2),
('Accountant', 70000, 3),
('Finance Manager', 75000, 3),
('HR Director', 75000, 4),
('Compensation Manager', 70000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jack', 'Jackson', 1, 2),
('Jill', 'Jilleon', 2, NULL),
('Bob', 'Bigget', 3, 4),
('Barb', 'Bregerton', 4, NULL),
('Mark', 'Martinez', 5, 6),
('Marcy', 'Miler', 6, NULL),
('Rachel', 'Ramierez', 7, NULL),
('Rob', 'Red', 8, NULL);