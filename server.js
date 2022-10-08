const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

connection.connect((error) => {
    if (error) throw error;
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
    let sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    connection.promise().query(sql, (error, response) => {
    if (error) throw error;
    console.table(response);
    promptUser();
    });
};

const viewAllRoles = () => {
    let sql = `SELECT role.id, role.title, department.department_name AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        promptUser();
    });
};

const viewAllEmployees = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS 'department', role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC`;
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        console.log(response);
        promptUser;
    });
};

const addDepartment = () => {
    
}
