const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { throwError } = require('rxjs');

connection.connect((error) => {
    if(error) throw error;
    promptUser();
});

const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please choose one of the following options:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee role'
            ]
        }
    ])

    .then ((answers) => {
        const {choices} = answers;

        if (choices === 'View all departments') {
            viewAllDepartments();
        }
        if (choices === 'View all roles') {
            viewAllRoles();
        }
        if (choices === 'View all employees') {
            viewAllEmployees();
        }
        if (choices === 'Add a department') {
            addDepartment();
        }
        if (choices === 'Add a role') {
            addRole();
        }
        if (choices === 'Add an employee') {
            addEmployee();
        }
        if (choices === 'Update an employee role') {
            updateEmployeeRole();
        }
        if (choices === 'Done') {
            connection.end();
        }
    });
};

const viewAllDepartments = () => {
    let sql = 
}


