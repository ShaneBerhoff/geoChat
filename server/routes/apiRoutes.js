const express = require('express');
const router = express.Router();
//const ispMiddleware = require('../middleware/ispMiddleware');
const usernameMiddleware = require('../middleware/usernameMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// route for user entry validation
router.post('/validate', (req, res, next) => {
    console.log('Validate route hit');
    req.locationValid = true;
    next();
}, 
//ispMiddleware,
usernameMiddleware, 
(req, res) => {
    console.log('Validation passed');

    // set session token as a cookie
    res.cookie('sessionToken', req.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'never', // TODO: Make secure in production
        sameSite: 'strict',
    });

    res.json({ locationValid: req.locationValid, usernameValid: req.usernameValid});
});

// route for auth validation
router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json();
});


module.exports = router;