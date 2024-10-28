const Session = require('../models/sessionModel')
const { v4: uuidv4 } = require('uuid');
const debug = process.env.DEBUG ? console.debug : () => {};

// Finds user session, activates it, and loads it
const loadUser = async (sessionToken) => {
    let session;
    try {
        // activate session
        session = await Session.findOneAndUpdate(
            { token: sessionToken },
            {
                $set: { isActive: true },
                $unset: { expiresAt: 1 }
            },
            { new: true }
        );
        if (!session) {
            debug('No session found for token:', sessionToken);
            return null;
        }
    } catch (error) {
        console.error("Error finding username for session:", error);
        throw error;
    }

    debug(`Session ${sessionToken} set to active.`);

    return session;
}

// Finds an exisitng session with a username
const findExistingSession = async (username) => {
    try {
        return await Session.findOne({ username: username });
    } catch (error) {
        console.error("Error checking for existing username:", error);
        throw error;
    }
};

// Deactivates a session
const deactivateSession = async (sessionToken) => {
    if (sessionToken) {
        const expiresAt = new Date(Date.now() + parseInt(process.env.SESSION_RECOVERY_PERIOD) * 60 * 1000);
        try {
            await Session.updateOne(
                { token: sessionToken },
                {
                    $set: {
                        isActive: false,
                        expiresAt: expiresAt
                    }
                }
            );
            debug(`Session ${sessionToken} set to inactive`);
        } catch (error) {
            console.error('Error setting session to inactive:', error);
        }
    }
};

// Creates a new session with a username
const createSession = async (username) => {
    try {
        // Create a new session token
        const token = uuidv4();

        // Give them username
        const session = new Session({
            token: token,
            username: username
        });
        await session.save();
        return token;
    } catch (error) {
        console.error("Error creating new session:", error);
        throw error;
    }
};

// Updates a session to contain the valid chatRooms
const updateRooms = async (sessionToken, chatRooms) => {
    if (!sessionToken) {
        throw new Error("Session token required to adjust session's chatRooms");
    }

    try {
        await Session.updateOne(
            { token: sessionToken },
            { $set: {chatRooms: chatRooms} }
        );
    } catch (error) {
        console.error("Error updating room:", error);
        throw error;
    }
};

// deactivates all sessions
const deactivateAllSessions = async () => {
    try {
        const result = await Session.updateMany(
        {}, // empty filter matches all documents
        { $set: { isActive: false } }
    );
        console.log(`Successfully deactivated ${result.modifiedCount} sessions`);
    } catch (error) {
        console.error('Error deactivating sessions:', error);
    }
    
}

module.exports = {
    loadUser,
    findExistingSession,
    deactivateSession,
    createSession,
    updateRooms,
    deactivateAllSessions
};