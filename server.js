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
    connection.query(sql, (error, response) => {
    if (error) throw error;
    console.table("Response:", response);
    promptUser();
    });
};

const viewAllRoles = () => {
    let sql = `SELECT role.id, role.title, role.salary, department.department_name AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        console.table("Response:", response);
        promptUser();
    });
};

const viewAllEmployees = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS 'department', role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        console.table("Response:", response);
        promptUser();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Enter name of new department',
        }
    ])
    .then((answer) => {
        let sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
            if (error) throw error;
            console.log(answer.newDepartment)
            viewAllDepartments();
        });
    });
};

const addRole = () => {
        inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'Enter title of new role',
        },
        {
            name: 'newRoleSalary',
            type: 'input',
            message: 'Enter salary of new role',
        },
        // {
        //     name: 'newRoleDepartment',
        //     type: 'input',
        //     message: 'Enter the department that this role is in',
        // }
        ])
        .then((answer) => {
            let sql = `INSERT INTO role (title, salary) VALUES (?, ?)`;
            let createdRole = [answer.newRole, answer.newRoleSalary]
            connection.query(sql, createdRole, (error) => {
                if (error) throw error;
                viewAllRoles();
            })
        })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'newEmployeeFN',
            type: 'input',
            message: 'Enter the employees first name',
        },
        {
            name: 'newEmployeeLN',
            type: 'input',
            message: 'Enter the employees last name',
        },
        // {
        //     name: 'newEmployeeRole',
        //     type: 'input',
        //     message: 'Enter the employees role',
        // },
        // {
        //     name: 'newEmployeeManager',
        //     type: 'input',
        //     message: 'Enter the employees manager',
        // },
    ])
    .then((answer) => {
        let sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
        let createdEmployee = [answer.newEmployeeFN, answer.newEmployeeLN]
        connection.query(sql, createdEmployee, (error) => {
            if (error) throw error;
            viewAllEmployees();
        });
    });
};


