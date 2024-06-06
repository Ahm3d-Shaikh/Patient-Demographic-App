const express = require('express');
const connection = require('../db');
const router = express.Router();

router.get('/practice-locations', (req, res) => {
    const query = "SELECT name from practice_locations";
    connection.query(query, (err, result) => {
        if (err) throw err;

        res.json(result.map(row => row.name));
    });
});


router.post('/appointments', (req, res) => {
    console.log(JSON.stringify(req.body));
    
    const {
        appointmentDate,
        appointmentTime,
        practiceLocation,
        appointmentType,
        speciality,
        doctor,
        duration,
        comments,
        patientId
    } = req.body;

    
    const getCaseIdQuery = "SELECT id from cases WHERE patient_id = ?";
    const getPracticeLocationIdQuery = "SELECT id from practice_locations WHERE name = ?";
    
    // Fetch practice_location_id
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
            
            // Fetch case_id
            connection.query(getCaseIdQuery, [patientId], (err, caseResults) => {
                if (err) {
                    console.error('Error fetching case ID: ', err);
                    res.status(500).json({ message: 'Internal Server Error' });
                    return;
                    }
                    
                    if (caseResults.length === 0) {
                        res.status(400).json({ message: 'No case found for the given patient ID' });
                        return;
                        }
                        
                        const caseId = caseResults[0].id;
                        
            // Insert appointment
            const insertAppointmentQuery = "INSERT INTO appointments (case_id, appointment_date, appointment_time, appointment_type, speciality, doctor, practice_location, duration, practice_location_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(insertAppointmentQuery, [
                caseId,
                appointmentDate,
                appointmentTime,
                appointmentType,
                speciality,
                doctor,
                practiceLocation,
                duration,
                practiceLocationId,
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting appointment: ', err);
                    res.status(500).json({ message: 'Internal Server Error' });
                    return;
                }

                console.log('Appointment added to the database');
                res.json({ message: 'Appointment Added Successfully' });
            });
        });
    });

})


module.exports = router;