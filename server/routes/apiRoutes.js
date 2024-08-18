const express = require('express');
const router = express.Router();
const usernameMiddleware = require('../middleware/usernameMiddleware');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const locationMiddlware = require('../middleware/locationMiddleware');
const deleteMiddleware = require('../middleware/deleteMiddleware');

// route for username validation
router.post('/check-username', usernameMiddleware, (req, res) => {
    // set session token as a cookie
    res.cookie('sessionToken', req.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.status(200).json({ message: "Valid username" });
});

// route for auth validation
router.post('/check-auth', sessionMiddleware, locationMiddlware, (req, res) => {
    res.status(200).json({ message: "Valid user in a valid location" });
});

// route for auth deletion
router.get('/remove-auth', deleteMiddleware, (req, res) => {
    res.clearCookie('sessionToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.status(200).json({ message: "Auth fully removed" });
});

module.exports = router;