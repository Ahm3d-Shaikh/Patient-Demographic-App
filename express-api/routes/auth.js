const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = require('../db');
const SECRET_KEY = process.env.SECRET_KEY;



router.post('/login', (req, res) => {
    const {email, password} = req.body;

    const query = `SELECT * from users WHERE email = ?`;
    connection.query(query, [email], (err, result) => {
        if (err) throw err;
        
        if(result.length == 0) {
            return res.status(404).json({message: 'User not found'});
        };

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if(!isMatch) {
                return res.status(401).json({message: 'Incorrect email or password'});
            }
            
            const token = jwt.sign({id: user.id, email: user.email}, SECRET_KEY, {expiresIn: '2h'});
            res.json({token, patientId: user.id, role: user.role});
        });
    });
});

router.post('/refresh-token', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).send('Unauthorized');
  
      const newToken = jwt.sign({ id: decoded.id }, SECRET_KEY, { expiresIn: '2h' });
      res.json({ token: newToken });
    });
  });


module.exports = router;
