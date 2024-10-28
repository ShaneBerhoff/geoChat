const chatController = require('./chatController');
const { Zone, Room } = require('../models/locationModels');
const fs = require('fs').promises;
const path = require('path');
const metricsManager = require('./metricsManager');
const debug = process.env.DEBUG ? console.debug : () => {};

const getRooms = async (longitude, latitude) => {
    // create a point
    const userPoint = {
        type: "Point",
        coordinates: [longitude, latitude]
    };

    // Find zones that contain the user's location
    const zones = await Zone.find({
        geometry: {
            $nearSphere: {
                $geometry: userPoint,
                $maxDistance: process.env.BUFFER_DISTANCE
            }
        }
    }).select('name');

    // If no zones found, return early
    if (zones.length === 0) {
        return null;
    }

    // Extract zone IDs
    const zoneIds = zones.map(zone => zone._id);

    // Find the rooms within the zones
    const rooms = await Room.find({
        zoneId: { $in: zoneIds },
        geometry: {
            $nearSphere: {
                $geometry: userPoint,
                $maxDistance: process.env.BUFFER_DISTANCE
            }
        }
    }).select('name');


    const chatRooms = [
        ...zones.map(zone => ({ id: zone._id, name: zone.name, type: 'zone' })),
        ...rooms.map(room => ({ id: room._id, name: room.name, type: 'room' }))
    ];

    if (chatRooms) {
        debug("User is in:");
        debug(chatRooms);
        return chatRooms;
    } else {
        return null;
    }
};

// Loads all zones and rooms into the database
const loadGeoJSONdata = async () => {
    try {
        // Read and parse the zones/rooms GeoJSON files
        const zonesData = JSON.parse(await fs.readFile(path.join(__dirname, '../locationData/zones.geojson'), 'utf8'));
        const roomsData = JSON.parse(await fs.readFile(path.join(__dirname, '../locationData/rooms.geojson'), 'utf8'));

        // Load zones
        const zoneOperations = zonesData.features.map(feature => ({
            updateOne: {
                filter: { name: feature.properties.name },
                update: {
                    $set: {
                        name: feature.properties.name,
                        geometry: feature.geometry
                    }
                },
                upsert: true
            }
        }));

        const zoneResult = await Zone.bulkWrite(zoneOperations);
        console.log(`Zones processed: ${zoneResult.upsertedCount} inserted, ${zoneResult.modifiedCount} updated`);

        // Create a map of zone names to IDs
        const zoneMap = new Map(await Zone.find().select('name _id').then(zones =>
            zones.map(zone => [zone.name, zone._id])
        ));

        // Prepare room operations
        const roomOperations = roomsData.features.reduce((acc, feature) => {
            if (feature.properties.zone_name) {
                const zoneId = zoneMap.get(feature.properties.zone_name);
                if (zoneId) {
                    acc.push({
                        updateOne: {
                            filter: { name: feature.properties.name, zoneId: zoneId },
                            update: {
                                $set: {
                                    name: feature.properties.name,
                                    zoneId: zoneId,
                                    geometry: feature.geometry
                                }
                            },
                            upsert: true
                        }
                    });
                } else {
                    console.warn(`Zone not found for room: ${feature.properties.name}. Skipping this room.`);
                }
            } else {
                console.warn(`No zone specified for room: ${feature.properties.name}. Skipping this room.`);
            }
            return acc;
        }, []);

        // Load rooms
        if (roomOperations.length > 0) {
            const roomResult = await Room.bulkWrite(roomOperations);
            console.log(`Rooms processed: ${roomResult.upsertedCount} inserted, ${roomResult.modifiedCount} updated`);
        } else {
            console.log('No valid rooms to process.');
        }

        console.log('GeoJSON data loaded successfully');
    } catch (error) {
        console.error('Error loading GeoJSON data:', error);
        process.exit(1);
    }
};

const setupCycleRooms = async (socket, session) => {
    socket.chatRooms = session.chatRooms;

    // Init index
    socket.currentRoomIndex = -1;

    // Set up toggle
    socket.cycleRooms = async function () {
        // Leave current
        if (this.currentRoom) {
            console.log(`${this.username} left room: ${this.currentRoom}`)
            this.leave(this.currentRoom);
        }

        // Cycle to the next room
        this.currentRoomIndex = (this.currentRoomIndex + 1) % this.chatRooms.length;
        const currentRoomInfo = this.chatRooms[this.currentRoomIndex];
        this.currentRoom = `[${currentRoomInfo.type}][${currentRoomInfo.name}][${currentRoomInfo.id}]`;
        this.join(this.currentRoom);
        console.log(`${this.username} joined room: ${this.currentRoom}`);

        userInfo = {
            username: session.username,
            createdAt: session.createdAt,
            chatRoom: this.chatRooms[this.currentRoomIndex].name
        }
        // Send user info to client
        debug('User info emitted to client:', userInfo)
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
        metricsManager.handleRoomEvent(this.currentRoom, "join", this.ip);
    };

    // Initial room setup
    await socket.cycleRooms();
};

const getClosestZone = async (longitude, latitude) => {
    const userPoint = {
        type: "Point",
        coordinates: [longitude, latitude]
    };

    // Find closest zone to user location
    const closestZone = await Zone.findOne({
        geometry: {
          $nearSphere: {
            $geometry: userPoint
          }
        }
    }).select('name');

    debug("User closest to:", closestZone.name);
    return closestZone.name;
}

module.exports = {
    loadGeoJSONdata,
    getRooms,
    setupCycleRooms,
    getClosestZone
}