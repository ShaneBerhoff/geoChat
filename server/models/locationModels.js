const { Schema, model } = require('mongoose');

const zoneSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    geometry: {
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

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    zoneId: {
        type: Schema.Types.ObjectId,
        ref: 'Zone',
        required: true
    },
    geometry: {
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

// Compound index to ensure unique room names within a zone
roomSchema.index({ name: 1, zoneId: 1 }, { unique: true });

// Geospatial indexes
zoneSchema.index({ geometry: '2dsphere' });
roomSchema.index({ geometry: '2dsphere' });

const Zone = model('Zone', zoneSchema, 'zones');
const Room = model('Room', roomSchema, 'rooms');

module.exports = { Zone, Room };