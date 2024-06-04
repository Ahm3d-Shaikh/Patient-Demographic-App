const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

var index = require('./routes/index')
var registration = require('./routes/registration')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'patient-app', 'dist', 'patient-app', 'browser')));

app.use('/api/v1', registration);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'patient-app','dist', 'patient-app', 'browser', 'registration', 'index.html'));
})


app.listen(3000, ()=> {
    console.log("Server's listening at port 3000");
});