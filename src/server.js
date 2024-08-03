require('dotenv').config({ path: './src/.env' });
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const chatController = require('./controllers/chatController');
const connectDB = require('./utils/mongoClient');
const Session = require('./models/sessionModel');

// Create server and sockets
const server = http.createServer(app);
const io = socketIo(server);

// Connect mongoDB
connectDB();

// Socket action when connection
io.on('connection', async (socket) => {
    console.log('New client connected');

    // Load exisiting chat messages
    try {
        await chatController.loadMessages(io);
    } catch (error) {
        console.error('Error sending messages to client:', error)
    }

    socket.on('chat message', async (msg) => {
        console.log("Message received: ", msg);
        try {
            await chatController.handleMessage(io, msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected');

        const sessionToken = socket.handshake.auth.token;
        if (sessionToken) {
            try {
                await Session.findOneAndUpdate(
                    { token: sessionToken },
                    { isActive: false },
                    { new: true }
                );
                console.log(`Session ${sessionToken} set to inactive`);
            } catch (error) {
                console.error('Error setting session to inactive:', error);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});