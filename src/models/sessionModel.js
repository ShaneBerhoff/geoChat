const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
    token: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
});

const Session = model('Session', sessionSchema);

module.exports = Session;