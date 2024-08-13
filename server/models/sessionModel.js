const { Schema, model } = require('mongoose');

const SESSION_RECOVERY_MS = parseInt(process.env.SESSION_RECOVERY_PERIOD) * 60 * 1000;

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
        default: false 
    },
    expiresAt: {
        type: Date,
        default: function(){
            return new Date(Date.now() + SESSION_RECOVERY_MS);
        },
        expires: 0
    }
});

const Session = model('Session', sessionSchema);

module.exports = Session;