const inquire = require('inquirer');
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

    addDept(){},

    addRole(){},


};

module.exports = orm;