const inquire = require('inquirer');
const mysql = require('mysql');
const db = require('./connection');
const cTable = require('console.table');

const orm = {
    viewTable(table){
        let sql = 'SELECT * FROM ??';
        db.query(sql, [table], (err, response) => {
            if(!err) {
                throw err;
            }
            console.table(response);
        });
    },

    viewTableSearch(table, key, value){
        let sql = 'SELECT * FROM ?? WHERE ?? = ?';
        db.query()
    }
};