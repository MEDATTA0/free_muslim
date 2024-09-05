const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'priere.html'));
});


// On exporte le module
module.exports = router