const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const sqlPassword = require("./password");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASS,
  database: "employees",
});

const addADepartment = () => {
  inquirer
    .prompt([
      {
        name: "addDepartment",
        message:
          "Please enter the name of the department you would like to add?",
      },
    ])
    .then((res) => {
      let name = res;
      db.query(
        `INSERT INTO departments (name) VALUES ('${name.addDepartment}')`,
        (err, res) => {
          console.log("Added to database.");
        }
      );
    }).then(() => init())
};

const addARole = () => {
  db.query(`SELECT id, name FROM departments`, (err, res) => {
    const departmentChoices = res.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary for the role?",
        },
        {
          name: "departmentId",
          message: "Which department does the role belong to?",
          type: "list",
          choices: departmentChoices,
        },
      ])
      .then((row) => {
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ('${row.title}', '${row.salary}', '${row.departmentId}')`,
          (err, res) => {
            console.log("Role added.");
            init();
          }
        );
      });
  });
};

const addEmployee = () => {
  //pull list of managers and sets id still needs debugging
  db.query(`SELECT id, manager_id, first_name FROM employees WHERE manager_id IS NULL`, (err, res) => {
    const employeeManagers = res.map((managers) => ({
      name: managers.first_name,
      value: managers.id,
    }));

    //pull list of roles and sets the id
    db.query(`SELECT id, title FROM roles`, (err, res) => {
      const roleChoices = res.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            name: "firstName",
            message:
              "What is the first name of the employee you would like to add?",
          },
          {
            name: "lastName",
            message:
              "What is the last name of the employee you would like to add?",
          },
          {
            name: "role",
            message: "What role is the employee going to have?",
            type: "list",
            choices: roleChoices,
          },
          {
            name: "manager",
            type: "list",
            message: "Who will be the manager of this employee?",
            choices: employeeManagers,
          },
        ])
        .then((row) => {
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${row.firstName}', '${row.lastName}', '${row.role}', '${row.manager}')`,
            (err, res) => {
              if (err) {
                console.log(err);
              }
              console.log("Employee added.");
              init();
            }
          );
        });
    });
  });
};

const updateEmployee = async() => {
    const [employees] = await db.promise().query(`SELECT * FROM employees`)
    const [roles] = await db.promise().query(`SELECT * FROM roles`)

    inquirer.prompt ([
      {
        name: "updateEmployee",
        message: "Please select which employee you would like to update.",
        type: "list",
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        name: "newRole",
        message: "Please select the new role for the employee.",
        type: "list",
        choices: roles.map((employee) => ({
          name: employee.title,
          value: employee.id,
        })), // Add the choices for the new role
      },
      ]).then(async res => {
        await db.promise().query(`UPDATE employees SET role_id = ${res.newRole} WHERE id = ${res.updateEmployee}`)
        init();
      })
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
    ],
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
          init();
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
            init();
          }
        );
        break;
      case "View All Employees":
        db.query(
          `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            init();
          }
        );
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
        updateEmployee();
        break;
      case "Quit":
        db.end(); //Close the mysql connection
        break;
    }
  });
};


init();
