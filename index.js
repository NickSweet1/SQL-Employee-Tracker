const inquirer = require("inquirer");
const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: password,
//     database: 'employees'
//   });

const inquirerPrompt = [
  {
    name: "start",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit",
    ],
  },
];

init = () => {
  inquirer.prompt(inquirerPrompt);
};

init();
