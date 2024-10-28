const Session = require('../models/sessionModel');
const debug = process.env.DEBUG ? console.debug : () => {};

const deleteMiddleware = async (req, res, next) => {
    debug("Removing Auth");
    const sessionToken = req.cookies.sessionToken;
    debug("SessionToken:", sessionToken);

    if (!sessionToken) {
        debug("No session token nothing to remove");
        return res.status(401).json({ message: 'No token provided' });
    }

    Session.deleteOne({ token: sessionToken, isActive: false })
        .then(result => {
            if (result.deletedCount === 1) {
                debug("Session removed");
            } else {
                debug("No session removed");
            }
            return next();
        })
        .catch(error => {
            console.error('Could not delete session:', error)
            return res.status(500).json({ message: 'Internal server error' });
        });
};

module.exports = deleteMiddleware;