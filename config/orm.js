const mysql = require('mysql');
const db = require('./connection');
const cTable = require('console.table');

const orm = {
    viewTable(table){
        let sql = 'SELECT * FROM ??';
        db.query(sql, [table], (err, result) => {
            if(err) {
                throw err;
            }
            console.table(result);
        });
    },

    viewTableSearch(table, key, value){
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        db.query(sql, [table, key, value], (err, result) => {
            if(err) {
                throw err;
            }
            console.table(result);
        });
    },

    viewEmployeesByMang(){
        let sql = 'SELECT employee.first_name, employee.last_name AS employee_name FROM employee RIGHT JOIN employee ON employee.id = employee.manager_id';
        db.query(sql, (err, result) => {
            if(err) {
                throw err;
            }
            console.table(result);
        })
    },

    addEmployee(firstName, lastName, roleId, managerId){
        let sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [firstName, lastName, roleId, managerId], (err, result) => {
            if (err) {
                throw err;
            }
            console.log(`${lastName}, ${firstName} was added to Employee database!`);
        });
    },

    addDept(name){
        let sql = 'INSERT INTO department (name) VALUE (?)';
        db.query(sql, [name], (err, result) => {
            if (err) {
                throw err;
            }
            console.log(`${name} added to Departments database!`);
        });
    },

    addRole(title, salary, deptId){
        let sql = 'INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)';
        db.query(sql, [title, salary, deptId], (err, result) => {
            if (err) {
                throw err;
            }
            console.log(`${title} added to Roles database!`);
        });
    },

    updateRoles(id, role){
        let sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        db.query(sql, [role, id], (err, result) => {
            if (err) {
                throw err;
            }
            console.log('role updated')
        });
    },

    updateManager(id, manager){
        let sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
        db.query(sql, [manager, id], (err, result) => {
            if (err) {
                throw err;
            }
            console.log('manager updated')
        });
    }


};

module.exports = orm;