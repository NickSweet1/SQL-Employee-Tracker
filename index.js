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
    message: "Please enter the name of the department you would like to add?",
    when: (answers) => answers.start === "Add a Department"
  },
  {
    name: "addRole",
    message: "Please enter the name of the role you would like to add.",
    when: (answers) => answers.start === "Add a Role"
  },
  {
    name: "addRoleSalary",
    message: "Please enter a salary for this role.",
    when: (answers) => answers.addRole
  },
  {
    name: "addRoleDepartment",
    message: "Please provide a department for this role.",
    when: (answers) => answers.addRoleSalary
  },
  {
    name: "addEmployee",
    message: "Please enter the employee's first name, last name, role, and manager.",
    when: (answers) => answers.start === "Add an Employee"
  },
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
          `SELECT roles.id, roles.title, departments.name, roles.salary FROM roles INNER JOIN departments ON roles.department_id = departments.id`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
          }
        );
        break;
      case "View All Employees":
        db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id`, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
        });
        break;
      case "Add a Department":
          db.query(`INSERT INTO departments (name) VALUES ('${answers.addDepartment}')`);
          console.log(`The department "${answers.addDepartment}" has been added.`);
        break;
      case "Add a Role":

        console.log(`New role successfully added.`);
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answers.addRole}', '${answers.addRoleSalary}', '${answers.addRoleDepartment}')`)
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
