const Session = require('../models/sessionModel')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: '../.env' });

const loadUser = async (io, sessionToken) => {
    let session;
    try {
        session = await Session.findOne({token: sessionToken});
        if (!session) {
            console.log('No session found for token:', sessionToken);
            return null;
        }
    } catch (error){
        console.error("Error finding username for session:", error);
        throw error;
    }
    
    userInfo = {
        username: session.username,
        createdAt: session.createdAt
    }

    // Send user info to client
    console.log('User info emitted to client')
    io.emit('user info', userInfo);

    return session.username;
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
        const expiresAt = new Date(Date.now() + parseInt(process.env.SESSION_RECOVERY_PERIOD)*60*1000);
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
            console.log(`Session ${sessionToken} set to inactive`);
        } catch (error) {
            console.error('Error setting session to inactive:', error);
        }
    }
};

const reactivateSession = async (sessionToken) => {
    try {
        await Session.updateOne(
            { token: sessionToken },
            { 
                $set: { isActive: true },
                $unset: { expiresAt: 1 }
            }
        );                      
    } catch (error) {
        console.error('Error reactivating session:', error);
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
    loadUser,
    findExistingSession,
    deactivateSession,
    reactivateSession,
    createSession
};