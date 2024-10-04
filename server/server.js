const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

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
let server;
let io;
if (process.env.NODE_ENV === 'development') {
    // In development - HTTPS with self-signed certificates
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
    };
    server = https.createServer(options, app);
    console.log('Server running in development mode with HTTPS');
    io = socketIo(server, { cors: corsOptions });
} else {
    // In production - use HTTP (Nginx will handle HTTPS)
    server = http.createServer(app);
    console.log('Server running in production mode with HTTP (Nginx handles HTTPS)');
    io = socketIo(server);
}

// Connect mongoDB
connectDB()
    .then(() => {
        // Load rooms
        roomController.loadGeoJSONdata();
    })

// Leaderboard manager
const leaderboard = new LeaderboardManager(io);

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
    if (userSession === null){
        socket.emit('invalid-session');
        socket.disconnect(true);
        return;
    }
    socket.username = userSession.username;

    // Sets up valid rooms for user
    roomController.setupCycleRooms(socket, userSession);

    // Send current leaderboard
    try {
        socket.emit('leaderboard', leaderboard.getLeaderboard());
        console.log("Existing leaderbaord sent to client");
    } catch (error){
        console.error('Error sending leaderboard to client:', error);
    }

    socket.on('chat message', async (msg) => {
        console.log(msg, "received from:", socket.username);
        // Send message to chat controller
        try {
            await chatController.handleMessage(socket, msg);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });

    socket.on('cycle rooms', async () => {
        try {
            socket.cycleRooms();
        } catch {
            console.error("Could not cycle through rooms", error);
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected');
        // Send session to session controller to deactivate
        sessionController.deactivateSession(socket.sessionToken);
    });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});