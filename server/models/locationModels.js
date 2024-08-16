const { Schema, model } = require('mongoose');

const campusSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    boundary: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    }
});

const buildingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    campus: {
        type: Schema.Types.ObjectId,
        ref: 'Campus',
        required: true
    },
    boundary: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    }
});

// Compound index to ensure unique building names within a campus
buildingSchema.index({ name: 1, campus: 1 }, { unique: true });
// Geospatial indexes
campusSchema.index({ boundary: '2dsphere' });
buildingSchema.index({ boundary: '2dsphere' });

const Campus = model('Campus', campusSchema, 'campuses');
const Building = model('Building', buildingSchema, 'buildings');

module.exports = { Campus, Building };