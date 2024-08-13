const express = require('express');
const staticRoutes = require('./routes/staticRoutes');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');
const corsOptions = require('./utils/corsOptions');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api', apiRoutes)

// Static files and react routing
app.use('/', staticRoutes)

module.exports = app;