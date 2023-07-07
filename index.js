const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const sqlPassword = require("./password");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: sqlPassword,
  database: "employees",
});

const inquirerPrompt = [
  {
    name: "start",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit",
    ]
  },
  {
    name: "addDepartment",
    message: "What is the name of the department you would like to add?",
    when: (answers) => answers.start === "Add a Department"
  },
  {
    name: "addRole",
    message: "Please enter the name, salary, and department for the role you would like to add.",
    when: (answers) => answers.start === "Add a Role"
  },
  {
    name: "addEmployee",
    message: "Please enter the employee's first name, last name, role, and manager.",
    when: (answers) => answers.start === "Add an Employee"
  },
  {
    name: "updateEmployee",
    message: "Please select an employee from the list to update.",
    type: "list" 
  } 
  // UPDATE TO A LIST TO SEE ALL EMPLOYEES FROM EMPLOYEES DB
];

init = () => {
  inquirer.prompt(inquirerPrompt).then((answers) => {
    switch (answers.start) {
      case "View All Departments":
        db.query(`SELECT * FROM departments`, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
        });
        break;
      case "View All Roles":
        db.query(
          `SELECT roles.id, roles.title, roles.salary FROM roles JOIN departments ON roles.department_id = departments.name`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
          }
        );
        break;
      case "View All Employees":
        // db.query(`SELECT * FROM employees`, (err, result) => {
        //   if (err) {
        //     console.log(err);
        //   }
        //   console.table(result);
        // });
        break;
      case "Add a Department":
        // insert logic
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
        db.end() //Close the mysql connection
        break;
    }
  });
};

init();
