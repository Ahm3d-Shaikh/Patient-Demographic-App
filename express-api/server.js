const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

var index = require('./routes/index');
var registration = require('./routes/registration');
var auth = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', registration);
app.use('/api/v1', auth);

app.use(express.static(path.join(__dirname, '..', 'patient-app', 'dist', 'patient-app', 'browser')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','patient-app','dist', 'patient-app', 'browser', 'register', 'index.html'));
});


app.listen(3000, ()=> {
    console.log("Server's listening at port 3000");
});