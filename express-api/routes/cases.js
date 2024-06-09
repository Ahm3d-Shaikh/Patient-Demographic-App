const express = require('express');
const router = express.Router();
const connection = require('../db');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).send('Unauthorized');
      req.user = decoded;
      next();
    });
  };
  
  // Middleware to check roles
  const authorize = (roles) => {
    return (req, res, next) => {
      const role = req.headers['role'];
      if (!roles.includes(role)) {
        return res.status(403).send('Forbidden');
      }
      next();
    };
  };


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

    const role = req.headers['role'];
    const patientId = req.headers['patientid'];
    const filters = req.query;


    let query = 'SELECT c.*, u.firstName, u.lastName, u.dob, u.speciality, a.appointment_date, a.appointment_time, a.doctor, a.practice_location, i.name as insuranceName, f.name as firmName ';
    query += 'FROM cases c ';
    query += 'LEFT JOIN users u ON c.patient_id = u.id ';
    query += 'LEFT JOIN appointments a ON c.id = a.case_id ';
    query += 'LEFT JOIN insurances i ON c.insurance_id = i.id ';
    query += 'LEFT JOIN firms f ON c.firm_id = f.id ';

    let conditions = [];
    let values = [];

    if (role === 'Patient') {
        conditions.push('c.patient_id = ?');
        values.push(patientId);
    } else if (role === 'Doctor') {
        conditions.push('a.doctor = (SELECT CONCAT(firstName, " ", lastName) FROM users WHERE id = ?)');
        values.push(patientId);
    }

    if (filters.patientId) {
        conditions.push('c.patient_id = ?');
        values.push(filters.patientId);
    }
    if (filters.firstName) {
        conditions.push('u.firstName LIKE ?');
        values.push('%' + filters.firstName + '%');
    }
    if (filters.lastName) {
        conditions.push('u.lastName LIKE ?');
        values.push('%' + filters.lastName + '%');
    }
    if (filters.caseId) {
        conditions.push('c.id = ?');
        values.push(filters.caseId);
    }
    if (filters.category) {
        conditions.push('c.category = ?');
        values.push(filters.category);
    }
    if (filters.purposeOfVisit) {
        conditions.push('c.purpose_of_visit = ?');
        values.push(filters.purposeOfVisit);
    }
    if (filters.caseType) {
        conditions.push('c.case_type = ?');
        values.push(filters.caseType);
    }
    if (filters.dob) {
        conditions.push('u.dob = ?');
        values.push(filters.dob);
    }
    if (filters.practiceLocation) {
        conditions.push('a.practice_location = ?');
        values.push(filters.practiceLocation);
    }
    if (filters.insuranceName) {
        conditions.push('i.name = ?');
        values.push(filters.insuranceName);
    }
    if (filters.firmName) {
        conditions.push('f.name = ?');
        values.push(filters.firmName);
    }
    if (filters.doa) {
        conditions.push('c.doa = ?');
        values.push(filters.doa);
    }
    if (filters.speciality) {
        conditions.push('u.speciality = ?');
        values.push(filters.speciality);
    }
    if (filters.appointmentDate) {
        conditions.push('a.appointment_date = ?');
        values.push(filters.appointmentDate);
    }
    if (filters.doctor) {
        conditions.push('a.doctor = ?');
        values.push(filters.doctor);
    }

    if (conditions.length > 0) {
        query += 'WHERE ' + conditions.join(' AND ');
    }

    connection.query(query, values, (err, result) => {
        if (err) {
            console.log("Error fetching cases ", err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        res.json(result);
    });
    
});

router.get('/cases/:id', (req, res) => {
    const caseId = req.params.id;
    const query = `SELECT c.id as case_id, c.category, c.purpose_of_visit, c.case_type, c.doa, c.practice_location, a.appointment_date as appointment_date, a.doctor as doctor, i.name as insuranceName, f.name as firmName FROM cases c LEFT JOIN appointments a ON c.id = a.case_id LEFT JOIN insurances i ON c.insurance_id = i.id LEFT JOIN firms f ON c.firm_id = f.id WHERE c.id = ?`;

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


router.get('/specialities', (req, res) => {
    const query = `SELECT speciality from users`;

    connection.query(query, (err, result) => {
        if (err) {
            console.log("Error fetching specialities ", err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }

        res.json(result.map(row => row.speciality));
    });
});

router.get('/doctor-name', (req, res) => {

    const query = `SELECT firstName, lastName from users WHERE role = 'Doctor'`;

    connection.query(query, (err, result) => {
        if(err) {
            console.log("Error fetching doctors from database ", err);
            res.sendStatus(500).json({message: 'Internal Server Error'});
        }

        if(result.length === 0) {
            res.sendStatus(401).json({message: 'Doctor not found'});
        }

        res.json(result.map(row => (row.firstName + " " + row.lastName)));
    });
});

router.delete('/cases/:id', (req, res) => {
    const id = req.params.id;
    const deleteAppointmentsQuery = `DELETE FROM appointments WHERE case_id = ?`;
    const deleteCaseQuery = `DELETE FROM cases WHERE id = ?`;

    // Start a transaction to ensure atomicity
    connection.beginTransaction((err) => {
        if (err) {
            console.log("Error starting transaction: ", err);
            res.sendStatus(500).json({ message: 'Internal Server Error' });
            return;
        }

        connection.query(deleteAppointmentsQuery, [id], (err, result) => {
            if (err) {
                connection.rollback(() => {
                    console.log("Error while deleting appointments: ", err);
                    res.sendStatus(500).json({ message: 'Internal Server Error' });
                });
                return;
            }

            connection.query(deleteCaseQuery, [id], (err, result) => {
                if (err) {
                    connection.rollback(() => {
                        console.log("Error while deleting case: ", err);
                        res.sendStatus(500).json({ message: 'Internal Server Error' });
                    });
                    return;
                }

                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            console.log("Error committing transaction: ", err);
                            res.sendStatus(500).json({ message: 'Internal Server Error' });
                        });
                        return;
                    }

                    res.sendStatus(200).json({ message: 'Case and appointments deleted successfully' });
                });
            });
        });
    });
})




module.exports = router;
