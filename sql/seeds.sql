INSERT INTO departments (name)
VALUES ('sales'),
       ('accounting'),
       ('engineering'),
       ('human resources'),
       ('marketing'),
       ('management');

INSERT INTO roles (title, salary, department_id)
VALUES ('salesperson', 40000, 1),
       ('sales specialist', 60000, 1),
       ('budget analyst', 60000, 2),
       ('accountant', 50000, 2),
       ('computer endineer', 100000, 3),
       ('recruiter', 40000, 4),
       ('trainer', 40000, 4),
       ('public relations', 50000, 5),
       ('SEO specialist', 55000, 5),
       ('general manager', 70000, 6),
       ('team lead', 40000, 6),
       ('assistant manager', 50000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Stacy', 'Smith', 1, 2),
       ('George', 'Cavalier', 2, 2);


