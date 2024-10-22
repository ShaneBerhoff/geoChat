const express = require("express");
const staticRoutes = require("./routes/staticRoutes");
const apiRoutes = require("./routes/apiRoutes");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const app = express();

// Security headers
app.use(helmet());

// rate limits
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 40, // allow 40 requests per 15 minutes, then...
  delayMs: () => 500, // begin adding 500ms of delay per request
});

if (process.env.NODE_ENV === "production") {
  // In production, trust the reverse proxy
  app.set("trust proxy", 1);
}

app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(cookieParser());

// apply limits
app.use("/api/", apiLimiter);
app.use("/api/", speedLimiter);

// ROUTES
app.use("/api", apiRoutes); // API routes
app.use("/", staticRoutes); // Static files and react routing

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;