const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"]
};

module.exports = corsOptions;