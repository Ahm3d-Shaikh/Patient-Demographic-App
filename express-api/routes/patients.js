const express = require('express');
const router = express.Router();
const connection = require('../db');


router.get('/patients/:id', (req, res) => {
    const patientId = req.params.id;

    const query = `SELECT firstName, lastName FROM users WHERE id = ? AND role = 'Patient'`;

    connection.query(query, [patientId], (err, result) => {
        if (err) {
            console.log("Error while fetching patient's name ", err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }

        if (result.length === 0) {
            res.status(401).json({message: 'Patient not found'});
            return;
        }

        res.json(result[0]);
    });
});

router.get('/doctor/:id', (req, res) => {
    const patientId = req.params.id;

    const query = `SELECT firstName, lastName FROM users WHERE id = ? AND role = 'Doctor'`;

    connection.query(query, [patientId], (err, result) => {
        if (err) {
            console.log("Error while fetching doctor's name ", err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }

        if (result.length === 0) {
            res.status(401).json({message: 'Doctor not found'});
            return;
        }

        res.json(result[0]);
    });
});





module.exports = router;