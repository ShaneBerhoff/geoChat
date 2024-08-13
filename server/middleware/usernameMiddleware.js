const sessionController = require('../controllers/sessionController');

const usernameMiddleware = async (req, res, next) => {
    try {
        // Pull out the username and token from client
        const username = req.body.username;
        const clientToken = req.cookies.sessionToken;
        console.log('Requested Username:', username);
        
        // Get existing session from username
        const existingSession = await sessionController.findExistingSession(username);

        // If it doesn't exist
        if (existingSession === null){
            // Create session
            const token = await sessionController.createSession(username);
            // Send down the line
            console.log("Valid username with SessionToken:", token);
            req.sessionToken = token;
            req.usernameValid = true;
            return next();
        } else if (!existingSession.isActive && existingSession.token === clientToken) { // If inactive and matching token recover
            // Send down the line
            console.log("Valid username recovery with SessionToken: ", clientToken);
            // Keep token
            req.sessionToken = clientToken;
            req.usernameValid = true;
            return next();
        } else { // Username is already in use
            console.log("Invalid Username")
            return res.status(403).json({ locationValid: req.locationValid, usernameValid: false });
        }
    } catch (error) {
        console.error('User validation error:', error);
        return res.status(500).json({ locationValid: req.locationValid, usernameValid: false });
    }
};

module.exports = usernameMiddleware;