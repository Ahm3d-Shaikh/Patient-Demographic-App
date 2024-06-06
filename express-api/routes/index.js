const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    console.log("index.js file k andar");
    var filePath = path.join(__dirname, '..','patient-app', 'app', 'src', 'registration', 'registration.component.html');
    res.sendFile(filePath);
});


module.exports = router;