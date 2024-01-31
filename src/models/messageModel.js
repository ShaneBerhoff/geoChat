const { Schema, model } = require('mongoose');

/* Structure of a message
content: the message
sender: username of sender
createdAt: the current time when it was sent
*/
const messageSchema = new Schema({
    content: String,
    sender: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = model('Message', messageSchema);

module.exports = Message;
