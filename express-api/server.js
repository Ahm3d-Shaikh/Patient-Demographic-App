const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

var index = require('./routes/index')
var registration = require('./routes/registration')

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rollno.165239',
    database: 'patient_demographics'
})

db.connect((err) => {
    if (err) throw err;

    console.log("MYSQL Connection Established");
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'patient-app', 'dist', 'patient-app', 'browser')));

app.use('/api/v1', registration);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'patient-app','dist', 'patient-app', 'browser', 'register', 'index.html'));
})

// app.post('/api/patients/', (req, res) => {
//     console.log("Server p request ja rhi hai");
//     console.log(req.body);
//     res.json({message: 'Patient Saved Successfully'});
// })

app.listen(3000, ()=> {
    console.log("Server's listening at port 3000");
});