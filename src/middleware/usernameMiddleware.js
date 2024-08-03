const sessionController = require('../controllers/sessionController');

const usernameMiddleware = async (req, res, next) => {
    try {
        // Pull out the username and token from client
        const {username, clientToken} = req.body;
        console.log('Username:', username);
        console.log('Client Token:', clientToken);
        
        // Get existing session from username
        const existingSession = await sessionController.findExistingSession(username);

        // If it doesn't exist
        if (existingSession === null){
            // Create session
            const token = await sessionController.createSession(username);
            // Send down the line
            console.log("Valid Username:", username);
            console.log("SessionToken:", token);
            req.sessionToken = token;
            return next();
        } else if (!existingSession.isActive && existingSession.token === clientToken) { // If inactive and matching token recover
            // Reactivate the session
            await sessionController.updateSession(existingSession, {
                isActive: true
            });
            
            // Send down the line
            console.log("Valid Recovery: ", username)
            console.log("SessionToken:", clientToken);
            // Keep token
            req.sessionToken = clientToken;
            return next();
        } else { // Username is already in use
            console.log("Invalid Username")
            return res.status(403).json({ locationValid: true, usernameValid: false });
        }
    } catch (error) {
        console.error('User validation error:', error);
        return res.status(500).json({ locationValid: true, usernameValid: false });
    }
};

module.exports = usernameMiddleware;