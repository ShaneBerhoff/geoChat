const Session = require('../models/sessionModel');

// Ensures that a session token exisits
const sessionMiddleware = async (req, res, next) => {
    console.log("Checking Auth");
    const sessionToken = req.cookies.sessionToken;
    console.log("SessionToken:", sessionToken);

    if (!sessionToken){
        console.log("Not authorized, no sessionToken");
        return res.status(401).json({ message: 'No token provided', type: 'AUTH_ERROR' });
    }

    try {
        const session = await Session.findOne({ token: sessionToken, isActive: false });
        if (!session){
            console.log("Not authorized, no session");
            return res.status(401).json({ message: 'Invalid or inactive session', type: 'AUTH_ERROR' });
        }
        console.log("Session auth Passed");
        next();
    } catch (error) {
        console.error('Error in session auth middleware:', error);
        return res.status(500).json({ message: 'Internal server error', type: 'SERVER_ERROR' });
    }
};

module.exports = sessionMiddleware;