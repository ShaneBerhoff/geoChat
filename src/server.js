require('dotenv').config({ path: './src/.env' });
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const chatController = require('./controllers/chatController');
const sessionController = require('./controllers/sessionController');
const connectDB = require('./utils/mongoClient');

// Create server and sockets
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',  //TODO: restrict later
      methods: ['GET', 'POST']
    }
  });  

// Connect mongoDB
connectDB();

// Socket action when connection
io.on('connection', async (socket) => {
    console.log('New client connected');
    socket.sessionToken = socket.handshake.auth.token;
    // Load user info
    socket.username = await sessionController.loadUser(socket);

    // Load exisiting chat messages
    try {
        await chatController.loadChat(socket);
    } catch (error) {
        console.error('Error sending chat messages to client:', error);
    }

    // Load exisiting message history
    try {
        await chatController.loadPersonalHistory(socket);
    } catch (error) {
        console.error('Error sending personal chat history to client:', error);
    }

    socket.on('chat message', async (msg) => {
        console.log("Message received from:", socket.username);
        console.log(msg);
        // Send message to chat controller
        try {
            await chatController.handleMessage(socket, msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected');
        // Send session to session controller to deactivate
        sessionController.deactivateSession(socket.sessionToken);
    });
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});