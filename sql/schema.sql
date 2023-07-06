DROP DATABASE IF EXISTS employees.db; -- deletes database if it already exists --
CREATE DATABASE employees.db; -- creates a new database to add information to --

USE employees.bs; -- uses the database that we just created --

-- Create templates for all the tables --
CREATE TABLE departments (
    id INT NOT NULL, 
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    salary INT NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(30) NOT NULL,
)
