INSERT INTO departments (id, name)
VALUES (001, 'sales'),
       (002, 'accounting'),
       (003, 'engineering'),
       (004, 'human resources'),
       (005, 'marketing'),
       (006, 'management');

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, 'salesperson', 40000, 001),
       (002, 'sales specialist', 60000, 001),
       (003, 'budget analyst', 60000, 002),
       (004, 'accountant', 50000, 002),
       (005, 'computer endineer', 100000, 003),
       (006, 'recruiter', 40000, 004),
       (007, 'trainer', 40000, 004),
       (008, 'public relations', 50000, 005),
       (009, 'SEO specialist', 55000, 005),
       (010, 'general manager', 70000, 006),
       (011, 'team lead', 40000, 006),
       (012, 'assistant manager', 50000, 006);

-- INSERT INTO employees (id, first_name, last_name, role_id, manager_id);

