// Send message to all users
const sendMessage = async (io, messageData) => {
    try {
      io.emit('chat message', messageData);
      console.log("Message emitted to clients");
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  };
  
  module.exports = {
    sendMessage
  };