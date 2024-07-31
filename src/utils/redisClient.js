const redis = require('redis');
let sharedRedisClient = null;

// Function to connect to redis
const connectRedis = async () => {
    // If there is no client make one
    if (!sharedRedisClient) {
        sharedRedisClient = redis.createClient({
            url: process.env.REDIS_URL
        });

        sharedRedisClient.on('connect', () => console.log('Connected to Redis'));
        sharedRedisClient.on('error', (err) => console.error('Redis error', err));

        // Wait for the client to connect
        await sharedRedisClient.connect();
    }
    return sharedRedisClient;
};

module.exports = { connectRedis };