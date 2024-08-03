require('dotenv').config({ path: './src/.env' });
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const chatController = require('./controllers/chatController');
const sessionController = require('./controllers/sessionController');
const connectDB = require('./utils/mongoClient');

// Create server and sockets
const server = http.createServer(app);
const io = socketIo(server);

// Connect mongoDB
connectDB();

// Socket action when connection
io.on('connection', async (socket) => {
    console.log('New client connected');
    const sessionToken = socket.handshake.auth.token;

    // Load exisiting chat messages
    try {
        await chatController.loadChat(io);
    } catch (error) {
        console.error('Error sending chat messages to client:', error)
    }

    // Load exisiting message history
    try {
        await chatController.loadPersonalHistory(io, sessionToken);
    } catch (error) {
        console.error('Error sending personal chat history to client:', error)
    }

    socket.on('chat message', async (msg) => {
        console.log("Message received: ", msg);
        // Send message to chat controller
        try {
            await chatController.handleMessage(io, msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected');
        // Send session to session controller to deactivate
        sessionController.deactivateSession(sessionToken);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});