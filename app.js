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
        if (result.table === 'employees by manager') {
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

function modPrompt(){
    inquire.prompt([
        {
            type: 'list',
            message: 'How Would you like to modify the data?',
            choices: ['add new employee', 'add new dept', 'add new role', 'update'],
            name: 'action'
        }
    ]).then(response => {
        switch (response.action) {
            case 'add new employee':
                newEmployeePrompt();
                break;
        
            case 'add new dept':
                newDeptPrompt();
                break;

            case 'add new role':
                newRolePrompt();
                break;

            case 'update':
                updatePrompt();    
        }
    });
};

function newEmployeePrompt() {
    inquire.prompt([
        {
            type: 'input',
            message: 'first name?',
            name: 'firstname'
        },
        {
            type: 'input',
            message: 'last name?',
            name: 'lastname'
        },
        {
            type: 'input',
            message: 'role id?',
            name: 'roleid'
        },
        {
            type: 'input',
            message: 'manager id?',
            name: 'manid'
        }
    ]).then(result => {
        orm.addEmployee(result.firstname, result.lastname, result.roleid, result.manid);
    });
};
function newDeptPrompt() {
    inquire.prompt([
        {
            type: 'input',
            message: 'dept name?',
            name: 'name'
        },
        
    ]).then(result => {
        orm.addDept(result.name);
    });
};
function newRolePrompt() {
    inquire.prompt([
        {
            type: 'input',
            message: 'title?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'dept id?',
            name: 'deptid'
        },
    ]).then(result => {
        orm.addRole(result.title, result.salary, result.deptid);
    });
};

function updatePrompt(){
    inquire.prompt([
        {
            type: 'list',
            message: 'Would you like to update an employees manager or role?',
            choices: ['manager', 'role'],
            name: 'column'
        },
        {
            type: 'input',
            message: 'employee id?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'new role/manager id?',
            name: 'newid'
        }
    ]).then(response => {
        if (response.column === 'manager') {
            orm.updateManager(response.id, response.newid);
        } else {
            orm.updateRoles(response.id, response.newid);
        }
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
        response.primary === 'View' ? viewPrompt() : response.primary === 'Search' ? searchPrompt() : modPrompt()
    });
};

initialPrompt();