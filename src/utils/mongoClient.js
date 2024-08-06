const mongoose = require('mongoose');
require('dotenv').config({path: './src/.env'});

// MongoDB url
const url = process.env.MONGO_URL;

// Connects to Mongo
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            replicaSet: 'rs0'
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1)
    }
};

module.exports = connectDB;