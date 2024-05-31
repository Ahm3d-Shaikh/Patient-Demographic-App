const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rollno.165239',
    database: 'patient-demographics'
})


db.connect((err) => {
    if (err) throw err;

    console.log("MYSQL Connection Established");
});

app.use(express.json());

app.listen(3000, ()=> {
    console.log("Server's listening at port 3000");
});