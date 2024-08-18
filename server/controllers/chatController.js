const Message = require('../models/messageModel')
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const badwordsFilePath = path.join(__dirname, '../badwords.txt');

// Read bad words from the file
const readBadWords = () => {
  try {
    const data = fs.readFileSync(badwordsFilePath, 'utf8');
    return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  } catch (error) {
    console.error('Error reading bad words file:', error);
    return [];
  }
};

const forbiddenWords = readBadWords();

const moderateMessage = (text) => {
  forbiddenWords.forEach(forbiddenWord => {
    const regex = new RegExp(forbiddenWord, 'gi'); 
    const replacement = '*'.repeat(forbiddenWord.length);
    text = text.replace(regex, replacement);
  });
  return text;
};


// Save message and send to all users
const handleMessage = async (socket, messageData) => {
  const username = socket.username;
  const sessionToken = socket.sessionToken;
  
  messageData.content = moderateMessage(messageData.content);
  const room = socket.currentRoom;

  // Save to db
  try {
    const message = new Message({
      ...messageData,
      sessionToken: sessionToken,
      username: username,
      room: room
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
    socket.to(room).emit('chat message', userMessageData);
    socket.emit('chat message', userMessageData);
    console.log(userMessageData, "emitted to clients in room:", room);
  } catch (error) {
    console.error('Error in handleMessage:', error);
    throw error;
  }
};

// Load chat history
const loadChat = async (socket) => {
  try {
    const messages = await Message.find({ room: socket.currentRoom })
    .select('-sessionToken -room')
    .sort({ createdAt: 1 });

    socket.emit('load chat', messages);
    console.log("Existing chat messages sent to client")
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
}

const loadPersonalHistory = async (socket) => {
  try {
    // All past messages from the session in the current room
    const messages = await Message.find({ sessionToken: socket.sessionToken, room: socket.currentRoom })
    .select('content createdAt')
    .sort({ createdAt: 1 });

    socket.emit('load personal history', messages);
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