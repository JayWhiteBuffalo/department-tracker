const M = require('./db');
const cTable = require('console.table');



const viewAllDepartments  = () => {
    M.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    });
};

viewAllDepartments();