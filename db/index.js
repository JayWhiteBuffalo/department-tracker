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
            'SELECT * FROM roles'
        );
}

// Find all employees, join with roles & department.
//Display table with employee id, first & last name, job title, department, salary, and manager

//Add department

//Add role

//Add employee

//Update employee role

//Update employee manager

//View employees by manager

//Delete a department

//Delete a role

//Delete an employee

//View the total utilizaed budget of a department **bonus**

//Quit


};

module.exports =  new M(connection);