const inquirer = require("inquirer");
const mysql = require("mysql2");
const sqlPassword = require('./password');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: sqlPassword,
    database: 'employees'
  });

const inquirerPrompt = [
  {
    name: "start",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View All Employees",
      "View All Roles",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit",
    ],
  },
];

init = () => {
  inquirer.prompt(inquirerPrompt).then((answers) => {
    switch (answers.start) {
      case "View All Employees":
        // insert logic
        break;
      case "View All Roles":
        // insert logic
        break;
      case "Add a Department":
        //insert logic
        break;
      case "Add a Role":
        //insert logic
        break;
      case "Add an Employee":
        //insert logic
        break;
      case "Update an Employee Role":
        //insert logic
        break;
      case "Quit":
        // connection.end() //Close the mysql connection
        break;
    }
  });
};

init();
