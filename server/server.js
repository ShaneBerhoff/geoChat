const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `./server/.env.${ENV}` });

const connectDB = require('./utils/mongoClient');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const corsOptions = require('./utils/corsOptions');
const cookie = require('cookie');
const app = require('./app');
const chatController = require('./controllers/chatController');
const sessionController = require('./controllers/sessionController');
const LeaderboardManager = require('./controllers/leaderboardManager');
const roomController = require('./controllers/roomController');

// Create server and sockets
if (ENV === 'production') {
    const options = {
        key: fs.readFileSync(path.join(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
    };
    server = https.createServer(options, app);
} else {
    server = http.createServer(app);
}
const io = socketIo(server, { cors: corsOptions });

// Connect mongoDB
connectDB()
    .then(() => {
        // Load rooms
        roomController.loadCampusConfig();
    })

// Leaderboard manager
new LeaderboardManager(io);

io.use(async (socket, next) => {
    // Pull out sessionToken
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    socket.sessionToken = cookies.sessionToken;
    next();
})

// Socket action when connection
io.on('connection', async (socket) => {
    console.log('New client connected');

    // Finds user session, activates it, and loads it
    const userSession = await sessionController.loadUser(socket.sessionToken);
    socket.username = userSession.username;

    // Sets up valid rooms for user
    roomController.setupRoomToggle(socket, userSession);
    
    // Loads all parts of room
    socket.toggleRoom();

    socket.on('chat message', async (msg) => {
        console.log(msg, "received from:", socket.username);
        // Send message to chat controller
        try {
            await chatController.handleMessage(socket, msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('room toggle', async () => {
        try {
            socket.toggleRoom();
        } catch {
            console.error("Could not toggle rooms", error);
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected');
        // Send session to session controller to deactivate
        sessionController.deactivateSession(socket.sessionToken);
    });
});

const PORT = process.env.PORT;
const HOST = process.env.HOST;
server.listen(PORT, HOST, () => {
    console.log(`Server running on ${process.env.CLIENT_URL}`);
});