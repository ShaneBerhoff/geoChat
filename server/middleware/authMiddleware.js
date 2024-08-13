const Session = require('../models/sessionModel');

// Ensures that a session token exisits
const authMiddleware = async (req, res, next) => {
    console.log("Checking Auth");
    const sessionToken = req.cookies.sessionToken;
    console.log("SessionToken:", sessionToken);

    if (!sessionToken){
        console.log("Not authorized, no sessionToken");
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const session = await Session.findOne({ token: sessionToken, isActive: false });
        if (!session){
            console.log("Not authorized, no session");
            return res.status(401).json({ message: 'Invalid or inactive session' });
        }
        console.log("Auth Passed");
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;