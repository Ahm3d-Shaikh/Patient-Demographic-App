const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');


const registration = require('./routes/registration');
const auth = require('./routes/auth');
const cases = require('./routes/cases');
const appointments = require('./routes/appointments');
const patients = require('./routes/patients');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', registration, auth, cases, appointments, patients);

app.use(express.static(path.join(__dirname, '..', 'patient-app', 'dist', 'patient-app', 'browser')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','patient-app','dist', 'patient-app', 'browser', 'register', 'index.html'));
});


app.listen(3000, ()=> {
    console.log("Server's listening at port 3000");
});