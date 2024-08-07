const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files from the React app
router.use(express.static(path.join(__dirname, '../../client/build')));

// Catch all other routes and return the index file, allowing React Router to handle routing
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

module.exports = router;