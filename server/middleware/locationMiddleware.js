const roomController = require('../controllers/roomController');
const sessionController = require('../controllers/sessionController');
const debug = process.env.DEBUG ? console.debug : () => {};

const locationMiddlware = async (req, res, next) => {
    console.log("Checking Location");
    const location = req.body.location;

    if(!location){
        debug("Not authorized, no location");
        return res.status(401).json({ message: 'No location provided', type: 'LOCATION_ERROR'});
    }

    try {
        const chatRooms = await roomController.getRooms(location.longitude, location.latitude);
        if (!chatRooms){
            debug("Not authorized, invalid location");
            const closestZone = await roomController.getClosestZone(location.longitude, location.latitude);
            return res.status(401).json({ message: 'Not in a valid location', type: 'LOCATION_ERROR', closestZone: closestZone});
        }
        await sessionController.updateRooms(req.cookies.sessionToken, chatRooms); // Update the session to belong to the chatRooms they are validated for
        debug("Location auth passed");
        next();
    } catch (error){
        console.error('Error in location auth middleware', error);
        return res.status(500).json({ message: 'Internal server error', type: 'SERVER_ERROR'});
    }
};

module.exports = locationMiddlware;