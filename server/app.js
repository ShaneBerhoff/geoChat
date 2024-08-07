const express = require('express');
const staticRoutes = require('./routes/staticRoutes')
const apiRoutes = require('./routes/apiRoutes')
const cors = require('cors');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

// API routes
app.use('/api', apiRoutes)

// Static files and react routing
app.use('/', staticRoutes)

module.exports = app;