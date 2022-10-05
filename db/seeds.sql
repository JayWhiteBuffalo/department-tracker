    INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Sales'),
('Legal');

    INSERT INTO roles (title, salary, department_id)
VALUES
('Tech Lead', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Sales Lead', 180000, 3),
('Salesperson', 80000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 180000, 4);

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Stark', 1, 1),
('Bruce', 'Wayne', 2, NULL),
('Charles', 'Xavier', 3, 2),
('Hank', 'McCoy', 4, NULL),
('John', 'Constantine', 5, 3),
('Zatanna', 'Zatara', 6, NULL),
('Phoenix', 'Wright', 7, 4),
('Harvey', 'Birdman', 8, NULL);
