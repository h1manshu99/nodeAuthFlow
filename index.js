const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const errorHandler = require("./src/middleware/errorHandler");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Defining routes
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    minPoolSize: 5,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

// Express-session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
    },
  })
);

// Rate limiting setup
const limiter = rateLimit({
  windowMs: process.env.TIME_FRAME, //the time window for which requests are counted
  max: 100, // Maximum requests from a single IP within the time window
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Middleware
app.use(express.json()); // Parse JSON request bodies

// routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// middleware error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
