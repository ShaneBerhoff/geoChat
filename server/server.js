const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

const connectDB = require('./utils/mongoClient');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const socketOptions = require('./utils/socketOptions');
const cookie = require('cookie');
const app = require('./app');
const chatController = require('./controllers/chatController');
const sessionController = require('./controllers/sessionController');
const LeaderboardManager = require('./controllers/leaderboardManager');
const roomController = require('./controllers/roomController');
const SocketRateLimiter = require('./utils/socketRateLimiter');

// Create server and sockets
let server;
if (process.env.NODE_ENV === 'development') {
    // In development - HTTPS with self-signed certificates
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
    };
    server = https.createServer(options, app);
    console.log('Server running in development mode with HTTPS');
} else {
    // In production - use HTTP (Nginx will handle HTTPS)
    server = http.createServer(app);
    console.log('Server running in production mode with HTTP (Nginx handles HTTPS)');
}
const io = socketIo(server, socketOptions);

// Connect mongoDB
connectDB()
    .then(() => {
        // Load rooms
        roomController.loadGeoJSONdata();
    })

// Leaderboard manager
const leaderboard = new LeaderboardManager(io);

const socketLimiter = new SocketRateLimiter();
io.use(async (socket, next) => {
    // rate limiting
    if(!socketLimiter.canConnect(socket.handshake.address)){
        return next(new Error('Too many connections, please try again later'));
    }

    // Pull out sessionToken
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const sessionToken = cookies.sessionToken;

    if (!sessionToken){
        return next(new Error('Authentication required'));
    }

    socket.sessionToken = sessionToken;
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
        // rate limit
        if(!socketLimiter.canSendMessage(socket.handshake.address)){
            return; // TODO: send info back to client
        }
        
        // sanitize message
        if (!msg.content || msg.content.length > 500){
            console.log("Oversized message from:", socket.username);
            return;
        }
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