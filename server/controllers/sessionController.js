const Session = require('../models/sessionModel')
const chatController = require('./chatController');
const { v4: uuidv4 } = require('uuid');

// Finds user session, activates it, joins room, sends user info to client
const loadUser = async (socket) => {
    let session;
    try {
        // activate session
        session = await Session.findOneAndUpdate(
            { token: socket.sessionToken },
            {
                $set: { isActive: true },
                $unset: { expiresAt: 1 }
            }
        ).populate('campus').populate('building').exec();
        if (!session) {
            console.log('No session found for token:', socket.sessionToken);
            return null;
        }
    } catch (error) {
        console.error("Error finding username for session:", error);
        throw error;
    }

    console.log(`Session ${socket.sessionToken} set to active.`);

    // Set up rooms
    const campus = session.campus;
    const building = session.building;
    socket.validRooms = {
        outerRoom: `${campus._id}:${null}`,
        subRoom: `${campus._id}:${building ? building._id : null}`
    };

    // Set up toggle
    socket.toggleRoom = async function () {
        // Leave current
        if (this.currentRoom) {
            this.leave(this.currentRoom);
        }

        // Toggle the room
        this.currentRoom = (this.currentRoom === this.validRooms.subRoom)
            ? this.validRooms.outerRoom
            : this.validRooms.subRoom;

        this.join(this.currentRoom);
        console.log(`Switched and joined ${this.currentRoom}`);

        userInfo = {
            username: session.username,
            createdAt: session.createdAt,
            campus: campus.name,
            building: ((this.validRooms.subRoom === this.currentRoom) && building) ? building.name : null
        }
        // Send user info to client
        console.log('User info emitted to client:', userInfo)
        socket.emit('user info', userInfo);

        // Load exisiting chat messages
        try {
            await chatController.loadChat(socket);
        } catch (error) {
            console.error('Error sending chat messages to client:', error);
        }

        // Load exisiting message history
        try {
            await chatController.loadPersonalHistory(socket);
        } catch (error) {
            console.error('Error sending personal chat history to client:', error);
        }
    };

    socket.toggleRoom();

    return session.username;
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
            console.log(`Session ${sessionToken} set to inactive`);
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

// Updates a session to be in a room
const updateRoom = async (sessionToken, room) => {
    if (!sessionToken || !room) {
        throw new Error("Session token and room are required");
    }

    try {
        await Session.updateOne(
            { token: sessionToken },
            { $set: room }
        );
    } catch (error) {
        console.error("Error updating room:", error);
        throw error;
    }
};

module.exports = {
    loadUser,
    findExistingSession,
    deactivateSession,
    createSession,
    updateRoom
};