const connection = require('./connection');

class M {
    constructor(connection) {
        this.connection = connection;
    }

//Find all departments//Display table showing department name and Id
findAllDepartments() {
    return this.connection
        .promise()
        .query(
            "SELECT * FROM department"
        );
}


//Find all roles
//Display job title, role id, department related to role, salary of that role
findAllRoles() {
    return this.connection
        .promise()
        .query(
            'SELECT roles.id, roles.title AS Role, department.name AS Department, roles.salary AS Salary FROM roles INNER JOIN department ON department.id = roles.department_id '
        );
}

// Find all employees, join with roles & department.
//Display table with employee id, first & last name, job title, department, salary, and manager
findAllEmployees() {
    return this.connection
        .promise()
        .query(
            'SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, department.name AS Department, roles.salary AS Salary FROM employee INNER JOIN roles ON roles.id = employee.role_id INNER JOIN department ON department.id = roles.department_id ORDER BY id ASC;'
        );
}



//Add department
addDepartment(department){
    return this.connection
        .promise()
        .query(
            `INSERT INTO department SET ?`, department
        );
}


//Get department Choices
getDepartmentChoices() {
    return this.connection
        .promise()
        .query(
            "SELECT name, id AS value FROM department"
        );
}
//Choices queries are for inquirer
//Employee Choices 
getEmployeeChoices() {
    return this.connection
        .promise()
        .query(
            'SELECT first_name, last_name, id AS value FROM employee'
        );
}

//Role choices
getRoleChoices() {
    return this.connection
        .promise()
        .query(
            'SELECT roles.id AS value, roles.title AS name FROM roles'
        );
}

ManagerChoices() {
    return this.connection 
        .promise()
        .query(
            'SELECT first_name, last_name, manager_id FROM employee WHERE manager_id IS NOT NULL '
        )
}

//Add role
addRole(newRole) {
    return this.connection
        .promise()
        .query(
            `INSERT INTO roles SET ?` , newRole
        )
}
//Add employee
addEmployee(employee) {
    return this.connection
        .promise()
        .query(
            `INSERT INTO employee SET ?` , employee
        )
}
//Update employee role
updateEmployeeRole(employeeID, roleID) {
    return this.connection
        .promise()
        .query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleID, employeeID]

        )
}


//Delete a department
removeDepartment(department) {
    return this.connection
        .promise()
        .query(
            `DELETE FROM department WHERE id = ?`, department
        )
}
//Delete a role
removeRole(roleId) {
    return this.connection
        .promise()
        .query(
            'DELETE FROM roles WHERE id = ?', roleId
        )
}
//Delete an employee
removeEmployee(employeeId) {
    return this.connection
        .promise()
        .query(
            `DELETE FROM employee WHERE id = ?`,employeeId  
        )
}


};

module.exports =  new M(connection);