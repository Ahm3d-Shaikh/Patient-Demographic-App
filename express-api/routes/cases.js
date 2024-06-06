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

module.exports = router;
