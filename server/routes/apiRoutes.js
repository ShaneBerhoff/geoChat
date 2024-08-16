const express = require('express');
const router = express.Router();
const usernameMiddleware = require('../middleware/usernameMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// route for username validation
router.post('/check-username', usernameMiddleware, (req, res) => {
    // set session token as a cookie
    res.cookie('sessionToken', req.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'never', // TODO: Make secure in production
        sameSite: 'strict',
    });

    res.json({ usernameValid: req.usernameValid});
});

// route for auth validation
router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json();
});


module.exports = router;