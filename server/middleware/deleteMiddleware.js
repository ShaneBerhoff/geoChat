const Session = require('../models/sessionModel');

const deleteMiddleware = async (req, res, next) => {
    console.log("Removing Auth");
    const sessionToken = req.cookies.sessionToken;
    console.log("SessionToken:", sessionToken);

    if (!sessionToken) {
        console.log("No session token nothing to remove");
        return res.status(401).json({ message: 'No token provided' });
    }

    Session.deleteOne({ token: sessionToken, isActive: false })
        .then(result => {
            if (result.deletedCount === 1) {
                console.log("Session removed");
            } else {
                console.log("No session removed");
            }
            return next();
        })
        .catch(error => {
            console.error('Could not delete session:', error)
            return res.status(500).json({ message: 'Internal server error' });
        });
};

module.exports = deleteMiddleware;