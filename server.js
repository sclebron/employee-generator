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
        {
            name: 'newRoleDepartment',
            type: 'input',
            message: 'Enter the department that this role is in',
        }
        ])
        .then((answer) => {
            let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            let createdRole = [answer.newRole, answer.newRoleSalary, answer.newRoleDepartment]
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
        {
            name: 'newEmployeeRole',
            type: 'input',
            message: 'Enter the employees role',
        },
        {
            name: 'newEmployeeManager',
            type: 'input',
            message: 'Enter the employees manager',
        },
    ])
    .then((answer) => {
        let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        let createdEmployee = [answer.newEmployeeFN, answer.newEmployeeLN, answer.newEmployeeRole, answer.newEmployeeManager]
        connection.query(sql, createdEmployee, (error) => {
            if (error) throw error;
            viewAllEmployees();
        });
    });
};

// const addRole = () => {
//     let sql = `SELECT * FROM department`
//     connection.query(sql, (error, response) => {
//         if (error) throw error;
//         let deptArray = [];
//         response.forEach((department) => {deptArray.push(department.department_name);
//         });
//         inquirer.prompt([
//             {
//                 name: 'departmentName',
//                 type: 'list',
//                 message: 'What department is this role in?',
//                 choices: 'deptArray'
//             }
//         ])
//         .then((answer) => {
//             if(answer.departmentName === 'Create department') {
//                 this.addDepartment();
//             } else {
//                 addRole2(answer);
//             }
//         });
//         const addRole2 = (departmentData) => {
//             inquirer.prompt([
//                 {
//                     name: 'role',
//                     type: 'input',
//                     message: 'What is the name of the role?',
//                 },
//                 {
//                     name: 'salary',
//                     type: 'input',
//                     message: 'What is the salary for this role?',
//                 }
//             ])
//             .then((answer) => {
//                 let newRole = answer.role;
//                 let departmentId;
//                 response.forEach((department) => {
//                     if (departmentData.departmentName === department.department_name) {departmentId = department_id;}
//                 });
//                 let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
//                 let createdRole = [newRole, answer.salary, departmentId];
//                 connection.query(sql, createdRole, (error) => {
//                     if (error) throw error;
//                     viewAllRoles();
//                 });
//             });
//         };
//     });
// };


// const addEmployee = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstName',
//             message: 'What is the employees first name?',
//         },
//         {
//             type: 'input',
//             name: 'lastName',
//             message: 'What is the employees last name?'
//         }
//     ])
//     .then(answer => {
//         const newEmployee = [answer.firstName, answer.lastName]
//         const roleSql = `SELECT role.id, role.title FROM role`;
//         connection.promise().query(roleSql, (error, data) => {
//             if (error) throw error;
//             const roles = data.map(({id, title}) => ({name: title, value: id}));
//             inquirer.prompt([
//                 {
//                     type: 'list',
//                     name: 'role',
//                     message: 'What is the employees role',
//                     choices: roles
//                 }
//             ])
//             .then(roleChoice => {
//                 const role = roleChoice.role;
//                 newRole.push(role);
//                 const managerSql = `SELECT * FORM employee`;
//                 connection.query(managerSql, (error, data) => {
//                     if (error) throw error;
//                     const managers = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
//                     inquirer.prompt([
//                         {
//                             type: 'list',
//                             name: 'manager',
//                             message: 'Who is the employees manager',
//                             choices: managers
//                         }
//                     ])
//                     .then(managerChoice => {
//                         const manager = managerChoice.manager;
//                         newEmployee.push(manager);
//                         const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
//                         connection.query(sql, newEmployee, (error) => {
//                             if (error) throw error;
//                             viewAllEmployees();
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };

