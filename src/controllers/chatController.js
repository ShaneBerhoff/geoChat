const Message = require('../models/messageModel')

// Save message and send to all users
const handleMessage = async (io, messageData, username, sessionToken) => {
  // Save to db
  try {
    const message = new Message({
      ...messageData,
      sessionToken: sessionToken,
      username: username
    });
    await message.save();
    console.log("Message saved to DB")
  } catch (error) {
    console.error('Failed to save message to DB:', error)
    throw error;
  }
  
  // Broadcast to all users
  try {
    userMessageData = {
      username: username,
      ...messageData
    };
    console.log("UserMessageData:", userMessageData);
    io.emit('chat message', userMessageData);
    console.log("Message emitted to clients");
  } catch (error) {
    console.error('Error in handleMessage:', error);
    throw error;
  }
};

// Load chat history
const loadChat = async (io) => {
  try {
    const messages = await Message.find()
    .select('-sessionToken')
    .sort({ createdAt: 1 });

    io.emit('load chat', messages);
    console.log("Existing chat messages sent to client")
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
}

const loadPersonalHistory = async (io, sessionToken) => {
  try {
    const messages = await Message.find({ sessionToken: sessionToken })
    .select('-sessionToken -username')
    .sort({ createdAt: 1 });

    io.emit('load personal history', messages);
    console.log("Existing personal history sent to client");
  } catch (error) {
    console.error('Error fetching personal history', error);
    throw error;
  }
}

module.exports = {
  handleMessage,
  loadChat,
  loadPersonalHistory
};