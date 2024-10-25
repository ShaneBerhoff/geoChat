const crypto = require("crypto");
const Metrics = require("../models/metricsModel");

class MetricsManager {
  constructor() {
    this.io = null;
    this.roomMetrics = new Map();
    this.SAVE_INTERVAL = parseFloat(process.env.METRICS);
    this.SALT = process.env.METRICS_SALT;

    if (!this.SAVE_INTERVAL) {
      throw new Error(
        "METRICS interval must be defined in environment variables"
      );
    }
    if (!this.SALT) {
      throw new Error("METRICS_SALT must be defined in environment variables");
    }
  }

  initialize(io) {
    if (this.io) return;
    if (!io)
      throw new Error("Socket.IO instance must be provided to MetricsManager");

    this.io = io;
    setInterval(async () => {
      try {
        await this.saveMetrics();
      } catch (error) {
        console.error("Failed to save metrics:", error);
      }
    }, this.SAVE_INTERVAL * 60000);

    console.log(
      "MetricsManager recording metrics every:",
      this.SAVE_INTERVAL,
      "minutes"
    );
  }

  hashIP(ip) {
    return crypto
      .createHash("md5")
      .update(ip + this.SALT)
      .digest();
  }

  parseRoomKey(roomKey) {
    const matches = roomKey.match(/\[(.*?)\]/g);
    if (matches && matches.length === 3) {
      return {
        type: matches[0].slice(1, -1),
        name: matches[1].slice(1, -1),
        id: matches[2].slice(1, -1),
      };
    }
    return null;
  }

  handleRoomEvent(roomKey, eventType, data) {
    const parsed = this.parseRoomKey(roomKey);
    if (!parsed) return;

    const { type, name, id } = parsed;
    let roomData = this.roomMetrics.get(id) || {
      type,
      name,
      messageCount: 0,
      uniqueUserHashes: new Set(),
    };

    switch (eventType) {
      case "message":
        roomData.messageCount++;
        break;
      case "join":
        const hashedIP = this.hashIP(data); // data is the IP
        roomData.uniqueUserHashes.add(hashedIP.toString("base64"));
        break;
    }

    this.roomMetrics.set(id, roomData);
  }

  async saveMetrics() {
    const totalActivity = this.io.engine.clientsCount;
    if (this.isSaving || (this.roomMetrics.size === 0 && totalActivity === 0)) {
      return;
    }

    this.isSaving = true;
    try {
      const metricsMap = new Map();
      for (const [id, data] of this.roomMetrics) {
        metricsMap.set(id, {
          type: data.type,
          name: data.name,
          messageCount: data.messageCount,
          uniqueUserHashes: Array.from(data.uniqueUserHashes).map((hash) =>
            Buffer.from(hash, "base64")
          ),
        });
      }

      await new Metrics({
        activeCount: totalActivity,
        roomMetrics: metricsMap,
      }).save();

      // Clear after successful save
      this.roomMetrics = new Map();
    } catch (error) {
      console.error("Failed to save metrics:", error);
    } finally {
      this.isSaving = false;
    }
  }
}

const metricsManager = new MetricsManager();
module.exports = metricsManager;
