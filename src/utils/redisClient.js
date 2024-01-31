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

// Function to create a new client for subscriptions
const createSubscriberClient = async () => {
    const client = redis.createClient({
        url: process.env.REDIS_URL
    });

    client.on('connect', () => console.log('Redis subscriber client connected'));
    client.on('error', (err) => console.error('Redis subscriber client error', err));

    await client.connect();
    return client;
};

module.exports = { connectRedis, createSubscriberClient };