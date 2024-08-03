const Message = require('../models/messageModel')
const sessionController = require('../controllers/sessionController');

// Save message and send to all users
const handleMessage = async (io, messageData) => {
  // Save to db
  try {
    const message = new Message(messageData);
    await message.save();
    console.log("Message saved to DB")
  } catch (error) {
    console.error('Failed to save message to DB:', error)
    throw error;
  }
  
  // Convert sessionToken to username and broadcast to all users
  try {
    userMessageData = {
      sender: await sessionController.findUser(messageData.sessionToken),
      content: messageData.content,
      timestamp: messageData.createdAt
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
    const messages = await Message.find().sort({ createdAt: 1})

    // convert sessions to usernames
    const messagesWithUsernames = await Promise.all(
      messages.map(async (message) => {
        const username = await sessionController.findUser(message.sessionToken);
        return {
          _id: message._id,
          sender: username,
          content: message.content,
          timestamp: message.createdAt,
        };
      })
    );

    //TODO: remove log once front loading is connected
    console.log("Messages With Usernames:", messagesWithUsernames)
    io.emit('load chat', messagesWithUsernames);
    console.log("Existing chat messages sent to client")
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
}

const loadPersonalHistory = async (io, sessionToken) => {
  try {
    const messages = await Message.find({ sessionToken: sessionToken });
    const username = await sessionController.findUser(sessionToken);
    const formattedMessages = messages.map((message) => {
      return {
          _id: message._id,
          sender: username,
          content: message.content,
          timestamp: message.createdAt
      };
    });

    //TODO: remove log once front loading is connected
    console.log("Personal message history with username:", formattedMessages);
    io.emit('load personal history', formattedMessages);
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