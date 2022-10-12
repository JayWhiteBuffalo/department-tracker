const M = require('./db');
const cTable = require('console.table');
const inquirer  = require('inquirer');
const { addEmployee, addDepartment, addRole, removeRole, removeEmployee, getDepartmentId } = require('./db');
const connection = require('./db/connection');




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
    inquirer.prompt([
        {
        name:"first_name",
        type:"input",
        message:"Enter first name"
        },
        {
        name:"last_name",
        type:"input",
        message:"Enter last name"
        }
    ])
    .then((answers) => {
        //logging answers into new array
        var newEmp = [{fname : answers.first_name, lname : answers.last_name}];
        // Get roles from db in proper name/value format for inquirer
        M.getRoleChoices().then(([rows]) => {
            console.log(rows);
        inquirer.prompt([
        {
        name: "role_id",
        type: "list",
        message: "What is their role?",
        choices: rows
        },
    ])
        .then((answers) => {
        
           let roleAnswer = answers;
           newEmp.push(roleAnswer);
           console.log(newEmp);
        M.ManagerChoices().then(([rows]) => {
            const managerChoices = rows.map(
                ({first_name, last_name, manager_id}) => (
                    {
                    name:`${first_name} ${last_name}`,
                    value: manager_id,
                    }
                )
            );
            console.log(managerChoices);
        inquirer.prompt([
         {
         name:"manager",
         type:"list",
         message:"Who is their Manager?",
         choices: managerChoices
         }])
        .then((answer) => {
            let managerID = answer;
            let employeeData = {
                first_name: newEmp[0].fname,
                last_name: newEmp[0].lname,
                role_id: newEmp[1].role_id,
                manager_id: managerID.manager,
            }
            console.log(employeeData);
            M.addEmployee(employeeData)
            .then(() => 
                console.log(employeeData.first_name + employeeData.last_name + "has been added to the company database!"))
                .then(() =>
                startApp())
            
    })
        })}
        )}) 
})

}











startApp();

