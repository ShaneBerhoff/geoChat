const Session = require('../models/sessionModel');

class LeaderboardManager {
    constructor(io) {
        this.io = io;
        // Global leaderboard
        this.currentLeaderboard = [];
        this.initializeChangeStream();
    }

    async initializeChangeStream() {
        try {
            // Initial leaderboard
            await this.updateLeaderboard();

            // Set up change stream
            const changeStream = Session.watch();
            changeStream.on('change', async (change) => {
                // Update for change to activity of a session.
                if (change.operationType === 'update' &&
                    (change.updateDescription.updatedFields.isActive !== undefined)) {
                    await this.updateLeaderboard();
                }
            });
        } catch (error) {
            console.error("Error initializing change stream:", error);
        }
    }

    async updateLeaderboard() {
        try {
            const newLeaderboard = await Session.find({ isActive: true })
                .select('username createdAt')
                .sort({ createdAt: 1 })
                .limit(parseInt(process.env.LEADERBOARD_MAX))
                .lean();

            // Check for change
            if (JSON.stringify(newLeaderboard) !== JSON.stringify(this.currentLeaderboard)) {
                this.currentLeaderboard = newLeaderboard;
                this.io.emit('leaderboard', this.currentLeaderboard);
                console.log("Leaderboard updated and broadcast to all clients");
            }
        } catch (error) {
            console.error("Error updating leaderboard:", error);
        }
    }

    getLeaderboard() {
        return this.currentLeaderboard;
    }
}

module.exports = LeaderboardManager;