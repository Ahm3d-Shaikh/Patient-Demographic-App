const express = require('express');
const router = express.Router();
const mysql = require('mysql');
require('dotenv').config();
const bcrypt = require('bcrypt');
const connection = require('../db')



router.post('/patients', (req, res) => {
    
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
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

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Error hashing password: ", err);
            return res.status(500).json({message: 'Internal Server Error'});
        };
        
        const query = `INSERT INTO Patients (firstName, middleName, lastName, email, password, gender, dob, homePhone, workPhone, cellPhone, address, city, state, zip, ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        connection.query(query, [firstName, middleName, lastName, email, hashedPassword, gender, dob, homePhone, workPhone, cellPhone, address, city, state, zip, ssn], (err, result) => {
            if (err) throw err;
            console.log("Data added to the table");
        })
    
        res.json({message: 'Patient Added Successfully'});
    });

});

module.exports = router;