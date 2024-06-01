var express = require('express');
var router = express.Router();


router.post('/patients', (req, res) => {
    console.log("Server p req ja rhi hai");
    console.log(JSON.stringify(req.body));

    res.json({message: 'Patient Added Successfully'});
})

module.exports = router;