INSERT INTO departments (name)
VALUES ('sales'),
       ('accounting'),
       ('engineering'),
       ('human resources'),
       ('marketing'),
       ('management');

INSERT INTO roles (title, salary, department_id)
VALUES ('Salesperson', 40000, 1),
       ('Sales Specialist', 60000, 1),
       ('Budget Analyst', 60000, 2),
       ('Accountant', 50000, 2),
       ('Computer Engineer', 100000, 3),
       ('Recruiter', 40000, 4),
       ('Trainer', 40000, 4),
       ('Public Relations', 50000, 5),
       ('SEO Specialist', 55000, 5),
       ('General Manager', 70000, 6),
       ('Team Lead', 40000, 6),
       ('Assistant Manager', 50000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Paul', 'McCartney', 2, null),
       ('Bob', 'Dylan', 1, 1),
       ('Freddy', 'Mercury', 3, null),
       ('David', 'Bowie', 4, 3),
       ('Kurt', 'Cobain', 4, 3),
       ('Robert', 'Plant', 4, 3),
       ('Steven', 'Tyler', 5, null),
       ('Mick', 'Jagger', 5, 7),
       ('Stevie', 'Nicks', 5, 7),
       ('Elton', 'John', 8, null),
       ('Tina', 'Turner', 7, 10),
       ('Eric', 'Clapton', 6, 10),
       ('Ozzy','Osbourne', 10, null),
       ('Eddie', 'Vedder', 12, 13),
       ('Keith', 'Richards', 12, 13),
       ('Jimi', 'Hendrix', 11, 13),
       ('Jimmy', 'Page', 11, 13);


