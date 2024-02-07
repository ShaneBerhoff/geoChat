require('dotenv').config({ path: '../.env' });
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const { createSubscriberClient } = require('./utils/redisClient');
const chatController = require('./controllers/chatController');

// Create server and sockets
const server = http.createServer(app);
const io = socketIo(server);

// Socket action when connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chat message', async (msg) => {
        console.log("Message received: ", msg);
        try {
            await chatController.sendMessage(msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Initialize and connect Redis client
async function initializeConnections() {
    try {
        const redisSubscriber = await createSubscriberClient();

        // Redis subscription for chat messages
        redisSubscriber.subscribe('chatMessages', (message) => {
            io.emit('chat message', JSON.parse(message));
            console.log("Message emitted to clients");
        });
    } catch (err) {
        console.error('Initialization failed:', err);
        process.exit(1); // Exit process if initialization fails
    }
}

initializeConnections().then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start the server:', err);
});