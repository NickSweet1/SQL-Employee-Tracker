DROP DATABASE IF EXISTS employees; -- deletes database if it already exists --
CREATE DATABASE employees; -- creates a new database to add information to --

USE employees; -- uses the database that we just created --

-- Create templates for all the tables --
CREATE TABLE departments (
    id INT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
)
