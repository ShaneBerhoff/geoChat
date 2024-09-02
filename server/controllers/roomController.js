const chatController = require('./chatController');
const { Campus, Building } = require('../models/locationModels');
const fs = require('fs').promises;
const path = require('path');

const getRoom = async (latitude, longitude) => {
    // create a point
    const userPoint = {
        type: "Point",
        coordinates: [latitude, longitude]
    };

    // Find the campus
    const campus = await Campus.findOne({
        boundary: {
            $geoIntersects: {
                $geometry: userPoint
            }
        }
    });

    if (!campus) {
        console.log("User is not on any campus");
        return null;
    }

    // Find the building within the campus
    const building = await Building.findOne({
        campus: campus._id,
        boundary: {
            $geoIntersects: {
                $geometry: userPoint
            }
        }
    });

    if (building) {
        console.log(`User is in ${campus.name}, ${building.name}`);
        return { campus, building };
    } else {
        console.log(`User is on ${campus.name} campus, but not in any specific building`);
        return { campus, building: null };
    }
};

// Loads all campuses and rooms into the database
const loadCampusConfig = async () => {
    try {
        // Read the JSON file
        const data = await fs.readFile(path.join(__dirname, '..', 'campusConfig.json'), 'utf8');
        const config = JSON.parse(data);

        for (const campusData of config.campuses) {
            // Create or update the campus
            const campus = await Campus.findOneAndUpdate(
                { name: campusData.name },
                {
                    name: campusData.name,
                    boundary: campusData.boundary
                },
                { upsert: true, new: true }
            );

            for (const buildingData of campusData.buildings) {
                // Create or update each building
                await Building.findOneAndUpdate(
                    { name: buildingData.name, campus: campus._id },
                    {
                        name: buildingData.name,
                        campus: campus._id,
                        boundary: buildingData.boundary
                    },
                    { upsert: true }
                );
            }
        }

        console.log('Campus configuration loaded successfully');
    } catch (error) {
        console.error('Error loading campus configuration:', error);
        process.exit(1);
    }
};

const setupRoomToggle = async (socket, session) => {
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
            console.log(`${this.username} left room: ${this.currentRoom}`)
            this.leave(this.currentRoom);
        }

        // Toggle the room
        this.currentRoom = (this.currentRoom === this.validRooms.subRoom)
            ? this.validRooms.outerRoom
            : this.validRooms.subRoom;

        this.join(this.currentRoom);
        console.log(`${this.username} joined room: ${this.currentRoom}`);

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
};

module.exports = {
    loadCampusConfig,
    getRoom,
    setupRoomToggle
}