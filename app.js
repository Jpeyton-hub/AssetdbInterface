const orm = require('./config/orm');
const inquire = require('inquirer');


function viewPrompt(){
    inquire.prompt([
        {
            type: 'list',
            message: 'Which table would you like to view?',
            choices: ['employee', 'department', 'role', 'employees by manager'],
            name: 'table'
        }
    ]).then(result => {
        if (result.table === 'Employees by Manager') {
            orm.viewEmployeesByMang();
        } else {
            orm.viewTable(result.table);
        }
    });
};

function searchPrompt(){
    inquire.prompt([
        {
            type: 'list',
            message: 'Which table would you like to search?',
            choices: ['role', 'department', 'employee'],
            name: 'table'
        },
        {
            type: 'input',
            message: 'By which column?',
            name: 'key'
        },
        {
            type: 'input',
            message: 'And what value in that column?',
            name: 'value'
        }
    ]).then(response => {
        let key = response.key.trim();
        let value = response.value.trim().toLowerCase();
        orm.viewTableSearch(response.table, key, value)
    });
};

function initialPrompt(){
    inquire.prompt([
        {
            type: 'list',
            message: 'How would like to interact with your assets?',
            choices: ['View', 'Search', 'Modify'],
            name: 'primary'
        }
    ]).then(response => {
        response.primary === 'View' ? viewPrompt() : response.primary === 'Search' ? searchPrompt() : modPrompt
    });
};

initialPrompt();