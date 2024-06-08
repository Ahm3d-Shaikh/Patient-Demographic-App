const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/cases', (req, res) => {

    const practiceLocation = req.body.practiceLocation;
    const category = req.body.category;
    const purposeOfVisit = req.body.purposeOfVisit;
    const caseType = req.body.caseType;
    const doa = req.body.doa;
    const patientId = req.body.patientId;
    const insuranceName = req.body.insuranceName;
    const firmName = req.body.firmName;

    const getPracticeLocationIdQuery = 'SELECT id FROM practice_locations WHERE name = ?';
    const getInsuranceIdQuery = 'SELECT id FROM insurances WHERE name = ?';
    const getFirmIdQuery = 'SELECT id FROM firms WHERE name = ?';

    // Logic for adding the relevant practice location id
    connection.query(getPracticeLocationIdQuery, [practiceLocation], (err, practiceLocationResults) => {
        if (err) {
            console.error('Error fetching practice location ID: ', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        if (practiceLocationResults.length === 0) {
            res.status(400).json({ message: 'Invalid practice location name' });
            return;
        }

        const practiceLocationId = practiceLocationResults[0].id;

        // Logic for adding the relevant insurance id
        connection.query(getInsuranceIdQuery, [insuranceName], (err, insuranceResults) => {
            if (err) {
                console.error('Error fetching insurance ID: ', err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            if (insuranceResults.length === 0) {
                res.status(400).json({ message: 'Invalid insurance name' });
                return;
            }

            const insuranceId = insuranceResults[0].id;

            // Logic for adding the relevant firm id
            connection.query(getFirmIdQuery, [firmName], (err, firmResults) => {
                if (err) {
                    console.error('Error fetching firm ID: ', err);
                    res.status(500).json({ message: 'Internal Server Error' });
                    return;
                }

                if (firmResults.length === 0) {
                    res.status(400).json({ message: 'Invalid firm name' });
                    return;
                }

                const firmId = firmResults[0].id;

                const insertCaseQuery = 'INSERT INTO cases (patient_id, practice_location_id, practice_location, category, purpose_of_visit, case_type, doa, insurance_id, firm_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(insertCaseQuery, [
                    patientId,
                    practiceLocationId,
                    practiceLocation,
                    category,
                    purposeOfVisit,
                    caseType,
                    doa,
                    insuranceId,
                    firmId
                ], (err, result) => {
                    if (err) {
                        console.error('Error inserting case: ', err);
                        res.status(500).json({ message: 'Internal Server Error' });
                        return;
                    }
                    console.log('Case added to the database');
                    res.json({ message: 'Case Added Successfully' });
                });
            });
        });
    });
});


router.get('/cases', (req, res) => {
    const patientId = req.query.patientId;
    const query = "SELECT * FROM cases WHERE patient_id = ?";

    connection.query(query, [patientId], (err, result) => {
        if (err) {
            console.log("Error Fetching Cases ", err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }
        res.json(result);
    });
});

router.get('/cases/:id', (req, res) => {
    const caseId = req.params.id;
    const query = `SELECT c.id as case_id, c.category, c.purpose_of_visit, c.case_type, c.doa, c.practice_location, a.speciality, a.appointment_date as appointment_date, a.doctor as doctor, i.name as insuranceName, f.name as firmName FROM cases c LEFT JOIN appointments a ON c.id = a.case_id LEFT JOIN insurances i ON c.insurance_id = i.id LEFT JOIN firms f ON c.firm_id = f.id WHERE c.id = ?`;

    connection.query(query, [caseId], (err, result) => {
        if (err) {
            console.error('Error fetching case details: ', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'Case not found' });
            return;
        }
        res.json(result[0]);
    });
});



router.get('/firms', (req, res) => {
    const query = 'SELECT name FROM firms';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching firms: ', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(results.map(row => row.name));
    });
});

router.get('/insurances', (req, res) => {
    const query = 'SELECT name FROM insurances';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching insurances: ', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.json(results.map(row => row.name));
    });
});



module.exports = router;
