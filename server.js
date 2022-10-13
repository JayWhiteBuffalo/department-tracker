const M = require('./db');
const cTable = require('console.table');
const inquirer  = require('inquirer');
const { addEmployee, addDepartment, addRole, removeRole, removeEmployee, getDepartmentId } = require('./db');
const connection = require('./db/connection');
const { listenerCount } = require('./db/connection');
const e = require('express');




function startApp() {
    inquirer.prompt({
        name: "main",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Departments",
            "View All Roles",
            "Update Employee",
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
                createRole();
                break;

            case "Remove Department":
                removeDepartment();
                break;
                
            case "Remove Role":
                removeRoles();
                break;
    
            case "Remove Employee":
                deleteEmployee();
                break;

            case "Update Employee":
                updateEmployee();
                break;
        }
    });
}
//View All Employees    
const viewAllEmployees  = () => {
    M.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
        startApp();
    });
};
// View Departments
const viewAllDepartments  = () => {
    M.findAllDepartments()
    .then(([rows]) => {
        console.table(rows);
        startApp();
    });
};

//View all roles
const viewAllRoles  = () => {
    M.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
        startApp();
    });
};

//Add Employee
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
                console.log(employeeData.first_name + " " + employeeData.last_name + "has been added to the company database!"))
                .then(() =>
                startApp())
            
    })
        })}
        )}) 
})

};

// Delete Employee

const deleteEmployee = () => {
    M.getEmployeeChoices().then(([rows]) => {
        let employeeChoices = rows.map((
            {first_name, last_name, value}) => (
                {
                name: `${first_name} ${last_name}`,
                value: value,
                }
            )
        )
    
    inquirer.prompt (
        {
        name: "manager_id",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employeeChoices
    })
    .then ((answer) => {
        console.log(answer)
        M.removeEmployee(answer.manager_id)
        console.log("Employee has been removed")
        startApp();
    })
    })};

    //Add Roles
     const createRole = () => {
        roleArr = [];
        M.getDepartmentChoices().then(([rows]) => {
            let departmentChoices = rows
        inquirer.prompt(
            {
            name: "department",
            type: "list",
            message: "Which department does this role work in?",
            choices: departmentChoices
            }
        ).then((department) => {
            roleArr.push(department)
            console.log(roleArr)
        }).then(() => 
        inquirer.prompt([
            {
            name: "title",
            type: "input",
            message: "Enter the name of this new role"
            },
            {
            name:"salary",
            type:"input",
            message: "Enter a Salary for this role"
            }
        ])
        .then((answers) => {
            roleArr.push(answers)
            let newRoleData = {
                title : roleArr[1].title,
                salary: roleArr[1].salary,
                department_id: roleArr[0].department
            }
            M.addRole(newRoleData);
            console.log("New Role has been added!")})
            .then(() => 
            startApp())
         )})};
    
// Remove Roles
const removeRoles = () => {
    M.getRoleChoices().then(([rows]) => {
        console.log(rows)
        inquirer.prompt(
            {
            name:"role_id",
            type: "list",
            message: "Which Role would you like to Remove?",
            choices: rows
            })
        .then((answer) => {
            M.removeRole(answer.role_id)
            console.log("Role has been removed")
            startApp();
        })
    })
};

//Add Department
const newDepartment = () => {
    inquirer.prompt(
        {
        name: "name",
        type: "input",
        message: "Enter a name for the new Department"
        }
    )
    .then((answer) => {
        M.addDepartment(answer)
        console.log("Department has been created!")
        startApp();
    })
};

//Remove Department
const removeDepartment = () => {
    M.getDepartmentChoices().then(([rows]) => {
        inquirer.prompt(
            {
            name:"department_id",
            type: "list",
            message: "Which department would like to Remove?",
            choices: rows
            }
        )
        .then((answer) => {
            M.removeDepartment(answer.department_id)
            console.log("Department has been removed")
            startApp();
        })
    })
}

//Update Employee
const updateEmployee = () => {
    M.getEmployeeChoices().then(([rows]) => {
        const employeeChoices = rows.map(
            ({first_name, last_name, value}) => (
                {
                name:`${first_name} ${last_name}`,
                value: value,
                }
            )
            
        );
        inquirer.prompt([
            {
            name: "id",
            type:"list",
            message: "Which employee would you like to update?",
            choices: employeeChoices
            }
        ])
        .then((answer) => {
            M.getRoleChoices().then(([rows]) => {
                inquirer.prompt([
                    {
                    name: "role_id",
                    type: "list",
                    message: "What is the new Role for this Employee?",
                    choices: rows
                    }
                ])
            .then((data) => {
                let employeeID = answer.id;
                let roleID = data.role_id;
                console.log(employeeID)
                console.log(roleID)
                M.updateEmployeeRole(employeeID, roleID)
                console.log("Role has been Updated!")
                startApp();
            });
            });
        });
    });
};











startApp();

