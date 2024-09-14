const { Schema, model } = require('mongoose');

const SESSION_RECOVERY_MS = parseInt(process.env.SESSION_RECOVERY_PERIOD) * 60 * 1000;

const chatRoomSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['zone', 'room'],
        required: true
    }
}, { _id: false });

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
        default: function () {
            return new Date(Date.now() + SESSION_RECOVERY_MS);
        },
        expires: 0
    },
    chatRooms: {
        type: [chatRoomSchema],
        default: []
      }
});

sessionSchema.index({ token: 1 });
const Session = model('Session', sessionSchema);

module.exports = Session;