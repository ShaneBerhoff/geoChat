const express = require('express');
const router = express.Router();
const usernameMiddleware = require('../middleware/usernameMiddleware');
const sessionMiddleware = require('../middleware/sessionMiddleware');
const locationMiddlware = require('../middleware/locationMiddleware');
const deleteMiddleware = require('../middleware/deleteMiddleware');

// route for username validation
router.post('/check-username', (req, res, next) => {
    const MAX_LENGTH = 20;
    const username = req.body.username.replace(/\s/g, '');
    if (!username || username.length > MAX_LENGTH) {
        return res.status(400).json({ 
          message: `Username must be between 1 and ${MAX_LENGTH} characters` 
        });
    }
    req.body.username = username;
    next();
}, usernameMiddleware, (req, res) => {
    // set session token as a cookie
    res.cookie('sessionToken', req.sessionToken, {
        httpOnly: true,
        secure: req.secure || process.env.NODE_ENV === 'development',
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
        secure: req.secure || process.env.NODE_ENV === 'development',
        sameSite: 'strict'
    });

    res.status(200).json({ message: "Auth fully removed" });
});

module.exports = router;