require('dotenv').config({ path: './src/.env' });
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
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
            await chatController.sendMessage(io, msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});