const { Schema, model } = require("mongoose");

const metricsSchema = new Schema({
  timestamp: {
    type: Date,
    unique: true,
    default: Date.now,
    index: true,
  },
  activeCount: {
    type: Number,
    required: true,
  },
  roomMetrics: {
    type: Map,
    of: new Schema({
      type: String,
      name: String,
      messageCount: Number,
      uniqueUserHashes: [{
        type: Buffer
      }]
    }, { _id: false }),
    required: true
  }
});

const Metrics = model("Metrics", metricsSchema);

module.exports = Metrics;
