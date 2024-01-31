const mongoose = require('mongoose');

// MongoDB url
const url = process.env.MONGO_URL;

// Connects to Mongo
const connectMongo = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
};

module.exports = connectMongo;
