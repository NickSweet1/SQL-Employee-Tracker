const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const sqlPassword = require("./password");
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASS,
  database: "employees",
});

// const departmentChoices = () => {
//   db.query(`SELECT name FROM departments`, (err, results) => {
//     console.log(results);
//   })
// }

const addADepartment = () => {
  inquirer.prompt([{
    name: "addDepartment",
    message: "Please enter the name of the department you would like to add?",
  }]).then((res) => {
    let name = res;
    db.query(`INSERT INTO departments (name) VALUES ('${name.addDepartment}')`, (err, res) => {
      console.log('Added to database.');
    });
    init();
  }) 
}

const addARole = () => {
  db.query(`SELECT id, name FROM departments`, (err, res) => {
    // console.log(res);
    const departmentChoices = res.map((department) => ({
      name: department.name,
      value: department.id
    }));

    inquirer.prompt([{
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: 'salary',
      message: 'What is your salary?'
    },
    {
      name: 'departmentId',
      message: 'Which department does the role belong to?',
      type: 'list',
      choices: departmentChoices
    }
  ]).then(row => {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${row.title}', '${row.salary}', '${row.departmentId}')`, (err, res) => {
      console.log('Role added.');
      init();
    })
  })
  })
}

const addEmployee = () => {

}

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
  // {
  //   name: "addDepartment",
  //   message: "Please enter the name of the department you would like to add?",
  //   when: (answers) => answers.start === "Add a Department"
  // },
  // {
  //   name: "addRole",
  //   message: "Please enter the name of the role you would like to add.",
  //   when: (answers) => answers.start === "Add a Role"
  // },
  // {
  //   name: "addRoleSalary",
  //   message: "Please enter a salary for this role.",
  //   when: (answers) => answers.addRole
  // },
  // {
  //   name: "addRoleDepartment",
  //   type: "list",
  //   choices: departmentChoices,
  //   when: (answers) => answers.addRoleSalary
  // },
  // {
  //   name: "addEmployee",
  //   message: "Please enter the employee's first name, last name, role, and manager.",
  //   when: (answers) => answers.start === "Add an Employee"
  // },
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
        init();
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
        init();
        break;
      case "Add a Department":
        addADepartment();
        break;
      case "Add a Role":
        addARole();
        break;
      case "Add an Employee":
        addEmployee();
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
