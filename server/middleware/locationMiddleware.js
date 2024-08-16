const roomController = require('../controllers/roomController');

const locationMiddlware = async (req, res, next) => {
    console.log("Checking Location");
    const location = req.body.location;

    if(!location){
        console.log("Not authorized, no location");
        return res.status(401).json({ message: 'No location provided', type: 'LOCATION_ERROR'});
    }

    try {
        const room = await roomController.getRoom(location.latitude, location.longitude);
        if (!room){
            console.log("Not authorized, invalid location");
            return res.status(401).json({ message: 'Not in a valid location', type: 'LOCATION_ERROR'});
        }
        console.log(room); //TODO: handle room for user
        console.log("Location auth passed");
        next();
    } catch (error){
        console.error('Error in location auth middleware', error);
        return res.status(500).json({ message: 'Internal server error', type: 'SERVER_ERROR'});
    }
};

module.exports = locationMiddlware;