const express = require('express');
const path = require('path');
const router = express.Router();

if (process.env.NODE_ENV === 'production') {
    // Middleware to check host and redirect if necessary
    router.use((req, res, next) => {
        const host = req.get('host');
        const clientUrl = new URL(process.env.CLIENT_URL);

        // Check if the host matches the expected production host
        if (host !== clientUrl.host) {
            return res.redirect(process.env.CLIENT_URL + req.url);
        }
        next();
    });

    // Serve static files and handle client-side routing in production only
    router.use(express.static(path.join(__dirname, '../../client/dist')));
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
    });
} else {
    // In development - redirect
    router.get('*', (req, res) => {
        // redirect to the Vite server:
        res.redirect(process.env.CLIENT_URL);
    });
}

module.exports = router;