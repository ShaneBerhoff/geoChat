const sessionController = require('../controllers/sessionController');
const debug = process.env.DEBUG ? console.debug : () => {};

const usernameMiddleware = async (req, res, next) => {
    console.log("Checking username");
    try {
        // Pull out the username and token from client
        const username = req.body.username;
        const clientToken = req.cookies.sessionToken;
        console.log('Requested Username:', username);

        if (!username){ // No username
            return res.status(400).json({error: "Username is required"});
        }
        
        // Get existing session from username
        const existingSession = await sessionController.findExistingSession(username);

        // If it doesn't exist
        if (existingSession === null){
            // Create session
            const token = await sessionController.createSession(username);
            // Send down the line
            debug("Valid username with SessionToken:", token);
            req.sessionToken = token;
            return next();
        } else if (!existingSession.isActive && existingSession.token === clientToken) { // If inactive and matching token recover
            // Send down the line
            debug("Valid username recovery with SessionToken: ", clientToken);
            // Keep token
            req.sessionToken = clientToken;
            return next();
        } else {
            // Username is already in use
            debug("Username already in use")
            return res.status(409).json({ error: 'Username already in use' });
        }
    } catch (error) {
        console.error('User validation error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = usernameMiddleware;