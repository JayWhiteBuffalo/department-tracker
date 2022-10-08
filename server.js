const M = require('./db');
const cTable = require('console.table');
const inquirer  = require('inquirer');
const { addEmployee, addDepartment, addRole, removeRole, removeEmployee } = require('./db');
const connection = require('./db/connection');


const roleArr = function getRoles() {
    connection.query("SELECT * from roles", function(error, res) {
        let allroles = res.map(roles => ({ name: roles.title, value: roles.id}));
        return allroles;
    });}




function startApp() {
    inquirer.prompt({
        name: "main",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Remove Department",
            "Remove Role",
            "Remove Employee",
            "Exist"
        ]
    })
    .then(function(answer){
        switch (answer.main) {
            case "View All Employees":
                viewAllEmployees();
                break;
            
            case "View All Departments":
                viewAllDepartments();
                break;
            
            case "View All Roles":
                viewAllRoles();
                break;

            case "Add Employee":
                newEmployee();
                break;

            case "Add Department":
                newDepartment();
                break;
                
            case "Add Role":
                newRole();
                break;
                
            case "Remove Role":
                removeRole();
                break;
    
            case "Remove Employee":
                removeEmployee();
                break;
        }
    });
}

const viewAllEmployees  = () => {
    M.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
        startApp();
    });
};

const viewAllDepartments  = () => {
    M.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
        startApp();
    });
};

const viewAllRoles  = () => {
    M.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
        startApp();
    });
};

const newEmployee  = () => {
    inquirer.prompt(
        {
        name:"first_name",
        type:"input",
        message:"Enter first name"
        },
        {
        name:"last_name",
        type:"input",
        message:"Enter last name"
        },
        //return name data in obj for later use
        //locate roles from db query
        {
        name:"role",
        type:"list",
        message:"Select role",
        choices: ""
        },
        {
        name:"manager",
        type:"confirm",
        message:"Is this person a Manager?",
        }
    )
    M.addEmployee()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
        startApp();
    });
};











startApp();


