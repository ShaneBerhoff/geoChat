const Message = require('../models/messageModel');
const { connectRedis } = require('../utils/redisClient');

// Connects to Redis
let redisPublish;
connectRedis().then(client => {
    redisPublish = client;
}).catch(console.error);

// Used to send a message to all users
const sendMessage = async (messageData) => {
    try {
        // Save message to MongoDB
        const message = new Message(messageData);
        await message.save();
        console.log("Message saved to DB");

        // Ensure Redis client is available
        if (redisPublish) {
            // Publish message to the correct Redis channel
            redisPublish.publish('chatMessages', JSON.stringify(message));
            console.log("Message published to Redis");
        } else {
            console.error('Redis client not available');
        }
    } catch (error) {
        console.error('Error in sendMessage:', error);
        throw error;
    }
};

module.exports = {
    sendMessage
};