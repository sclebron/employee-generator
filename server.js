const { appendFile } = require("fs");

const PORT = process.env.PORT || 3001;
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Tigers',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database`)
);

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`);
});