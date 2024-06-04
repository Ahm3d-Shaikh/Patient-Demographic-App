var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rollno.165239',
    database: 'patient_demographics'
})

connection.connect((err) => {
    if (err) throw err;

    console.log("MYSQL Connection Established");
});


router.post('/patients', (req, res) => {
    console.log("Server p req ja rhi hai");
    console.log(JSON.stringify(req.body));
    
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const homePhone = req.body.homePhone;
    const workPhone = req.body.workPhone;
    const cellPhone = req.body.cellPhone;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const ssn = req.body.ssn;

    const query = `INSERT INTO Patients (firstName, middleName, lastName, email, gender, dob, homePhone, workPhone, cellPhone, address, city, state, zip, ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [firstName, middleName, lastName, email, gender, dob, homePhone, workPhone, cellPhone, address, city, state, zip, ssn], (err, result) => {
        if (err) throw err;
        console.log("Data added to the table");
    })

    res.json({message: 'Patient Added Successfully'});
})

module.exports = router;