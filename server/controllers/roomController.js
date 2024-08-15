const { Campus, Building } = require('../models/locationModels');
const fs = require('fs').promises;
const path = require('path');

const getRoom = async (longitude, latitude) => {
    // create a point
    const userPoint = {
        type: "Point",
        coordinates: [longitude, latitude]
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

module.exports = {
    loadCampusConfig,
    getRoom
}