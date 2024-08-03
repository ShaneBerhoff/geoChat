const Session = require('../models/sessionModel')
const { v4: uuidv4 } = require('uuid');

async function updateSession(session, updateData){
    try {
        Object.keys(updateData).forEach(key => {
            if (session.schema.path(key)) {
                session[key] = updateData[key];
            }
        });

        await session.save();
    } catch (error) {
        console.error('Error updating session data:', error);
        throw error
    }
}

const usernameMiddleware = async (req, res, next) => {
    try {
        // Pull out the username and token from client
        const {username, clientToken} = req.body;
        console.log('Username:', username);
        console.log('Client Token:', clientToken);
        
        // Get info on existing session with username
        let existingSession;
        try {
            existingSession = await Session.findOne({ username: username });
        } catch (error) {
            console.error("Error checking for existing username:", error);
            return res.status(500).json({ locationValid: true, usernameValid: false });
        }

        // If it doesn't exist
        if (existingSession === null){
            try {
                // Create a new session token
                const token = uuidv4();

                // Give them that username
                const session = new Session({
                    token: token,
                    username: username
                });
                await session.save();

                // Send down the line
                console.log("Valid Username:", username);
                console.log("SessionToken:", token);
                req.sessionToken = token;
                return next();
            } catch (error) {
                console.error("Error creating new session:", error);
                return res.status(500).json({ locationValid: true, usernameValid: false });
            }
        } else if (!existingSession.isActive && existingSession.token === clientToken) { // If inactive and matching token recover
            try {
                // Keep same token
                const token = clientToken

                // Reactivate the session
                await updateSession(existingSession, {
                    isActive: true
                });

                // Send down the line
                console.log("Valid Recovery: ", username)
                console.log("SessionToken:", token);
                req.sessionToken = token;
                return next();
            } catch (error) {
                console.error("Error recovering session:", error);
                return res.status(500).json({ locationValid: true, usernameValid: false });
            }
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