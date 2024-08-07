const express = require('express');
const router = express.Router();
//const ispMiddleware = require('../middleware/ispMiddleware');
const usernameMiddleware = require('../middleware/usernameMiddleware');

// route for user entry validation
router.post('/validate', (req, res, next) => {
    console.log('Validate route hit');
    next();
}, 
//ispMiddleware,
usernameMiddleware, 
(req, res) => {
    console.log('Validation passed');
    res.json({ locationValid: true, usernameValid: true, sessionToken: req.sessionToken });
});

module.exports = router;