class IPRateLimiter {
  constructor() {
    this.ipLimits = new Map();

    // Configuration
    this.CONNECTION_LIMIT = 10; // max connections per minute
    this.MESSAGE_LIMIT = 10; // max messages per 10 seconds
    this.CONN_WINDOW = 60000; // 1 minute in ms
    this.MSG_WINDOW = 10000; // 10 seconds in ms
    this.CLEANUP_INTERVAL = 600000; // 10 minutes in ms

    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  initializeLimits() {
    const now = Date.now();
    return {
      connections: { count: 0, resetTime: now + this.CONN_WINDOW },
      messages: { count: 0, resetTime: now + this.MSG_WINDOW },
      lastActivity: now,
    };
  }

  canConnect(ip) {
    const now = Date.now();
    let data = this.ipLimits.get(ip);

    if (!data) {
      data = this.initializeLimits();
      this.ipLimits.set(ip, data);
    }

    // Reset connection counter if window expired
    if (now >= data.connections.resetTime) {
      data.connections.count = 0;
      data.connections.resetTime = now + this.CONN_WINDOW;
    }

    if (data.connections.count >= this.CONNECTION_LIMIT) {
      data.lastActivity = now;
      return false;
    }

    data.connections.count++;
    data.lastActivity = now;
    return true;
  }

  canSendMessage(ip) {
    const now = Date.now();
    let data = this.ipLimits.get(ip);

    if (!data) {
      data = this.initializeLimits();
      this.ipLimits.set(ip, data);
    }

    // Reset message counter if window expired
    if (now >= data.messages.resetTime) {
      data.messages.count = 0;
      data.messages.resetTime = now + this.MSG_WINDOW;
    }

    if (data.messages.count >= this.MESSAGE_LIMIT) {
      data.lastActivity = now;
      return false;
    }

    data.messages.count++;
    data.lastActivity = now;
    return true;
  }

  cleanup() {
    const now = Date.now();
    const maxInactiveTime = Math.max(this.CONN_WINDOW, this.MSG_WINDOW) * 2;

    for (const [ip, data] of this.ipLimits) {
      if (
        now - data.lastActivity > maxInactiveTime ||
        (now >= data.connections.resetTime && now >= data.messages.resetTime)
      ) {
        this.ipLimits.delete(ip);
      }
    }
  }

  getRateLimitInfo(ip) {
    const data = this.ipLimits.get(ip);
    if (!data) return null;

    return {
      messagesRemaining: Math.max(0, this.MESSAGE_LIMIT - data.messages.count),
      connectionsRemaining: Math.max(
        0,
        this.CONNECTION_LIMIT - data.connections.count
      ),
      messageResetInMs: Math.max(0, data.messages.resetTime - Date.now()),
      connectionResetInMs: Math.max(0, data.connections.resetTime - Date.now()),
    };
  }
}

module.exports = IPRateLimiter;
