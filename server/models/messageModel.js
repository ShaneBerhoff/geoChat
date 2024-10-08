const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    sessionToken: { 
        type: String, 
        required: true,
        index: true 
    },
    username: {
        type: String,
        required: true,
    },
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: parseInt(process.env.TTL)
    },
    room: {
        type: String,
        required: true,
        index: true
    }
}); 

const Message = model('Message', messageSchema);

module.exports = Message;