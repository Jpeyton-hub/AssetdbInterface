CREATE DATABASE assets_db;
USE assets_db;

CREATE TABLE department
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(225), 
    PRIMARY KEY(id)
);

CREATE TABLE role
(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(225),
    salary FLOAT,
    dept_id INT,
    PRIMARY KEY(id),  
);

CREATE TABLE employee
(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),   
);


