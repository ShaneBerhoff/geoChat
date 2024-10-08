const express = require('express');
const path = require('path');
const router = express.Router();

if (process.env.NODE_ENV === 'production') {
    // Serve static files and handle client-side routing in production only
    router.use(express.static(path.join(__dirname, '../../client/dist')));
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
    });
}

module.exports = router;