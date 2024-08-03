require('dotenv').config({ path: '../.env' });
const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    sessionToken: { 
        type: String, 
        required: true,
        index: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: process.env.TTL
    }
}); 

const Message = model('Message', messageSchema);

module.exports = Message;