const axios = require('axios');
const { connectRedis } = require('../utils/redisClient');

// Environment variables for API key and allowed ISPs
const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY;
const ALLOWED_ISPS = process.env.ALLOWED_ISPS ? process.env.ALLOWED_ISPS.split(',') : [];

// Get redis connection
let redisCache;
connectRedis().then(client => {
    redisCache = client;
}).catch(console.error);

// Function to retrieve client IP address
const getClientIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

// Function to get ISP info
const getISP = async (ipAddress) => {
    // For local testing
    if(ipAddress === '::ffff:127.0.0.1'){
        console.log("No ISP - Local Connection")
        isp = 'Local Connect';
        const isAllowed = ALLOWED_ISPS.includes(isp);
        const ispInfo = { isAllowed, isp};
        return ispInfo;
    }

    const cacheKey = `isp:${ipAddress}`;
    try {
        // Try and get ISP info from redis cache
        const cachedIspInfo = await redisCache.get(cacheKey);
        if (cachedIspInfo){
            console.log("ISP from cache");
            return JSON.parse(cachedIspInfo);
        }

        // If not in cash API call
        const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&ip_address=${ipAddress}`;
        const response = await axios.get(url);
        const isp = response.data.connection.isp_name;

        console.log("ISP from API =",isp);
        const isAllowed = ALLOWED_ISPS.includes(isp);
        const ispInfo = { isAllowed, isp };

        // Cache in redis with an expo
        await redisCache.set(cacheKey, JSON.stringify(ispInfo), {EX: 86400});

        return ispInfo;
    } catch (error) {
        console.error('Error fetching ISP info:', error);
        throw error;
    }
};

const ispMiddleware = async (req, res, next) => {
    try {
        const clientIp = getClientIp(req);
        const clientISP = await getISP(clientIp);

        if (clientISP && clientISP.isAllowed) {
            console.log("Valid Location");
            next();
        } else {
            console.log("Invalid Location");
            res.status(403).json({ locationValid: false, usernameValid: false });
        }
    } catch (error) {
        console.error('ISP check error:', error);
        res.status(500).json({ locationValid: false, usernameValid: false });
    }
};

module.exports = ispMiddleware