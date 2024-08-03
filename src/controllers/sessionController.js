const Session = require('../models/sessionModel')
const { v4: uuidv4 } = require('uuid');

const findUser = async (sessionToken) => {
    let session;
    try {
        session = await Session.findOne({token: sessionToken});
    } catch (error){
        console.error("Error finding username for session:", error);
    }
    return session ? session.username : null;
}

const findExistingSession = async (username) => {
    try {
        return await Session.findOne({ username: username });
    } catch (error) {
        console.error("Error checking for existing username:", error);
        throw error;
    }
};

const deactivateSession = async (sessionToken) => {
    if (sessionToken) {
        try {
            await Session.findOneAndUpdate(
                { token: sessionToken },
                { isActive: false },
                { new: true }
            );
            console.log(`Session ${sessionToken} set to inactive`);
        } catch (error) {
            console.error('Error setting session to inactive:', error);
        }
    }
}

const updateSession = async (session, updateData) => {
    try {
        Object.keys(updateData).forEach(key => {
            if (session.schema.path(key)) {
                session[key] = updateData[key];
            }
        });
        await session.save();
    } catch (error) {
        console.error('Error updating session data:', error);
        throw error;
    }
};

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


module.exports = {
    findUser,
    findExistingSession,
    deactivateSession,
    updateSession,
    createSession
};