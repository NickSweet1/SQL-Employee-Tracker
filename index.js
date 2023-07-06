const inquirer = require('inquirer');
const sql2 = require(sql2); //fix this code perhaps?


inquirer 
.prompt({
    name: 'start',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['View All Employees', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']
})