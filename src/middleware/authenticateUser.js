const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticateReq(req, res, next) {
  const token =
    req.headers["authorization"] || req.query.token || req.cookies.token;

  if (!token) {
    return next(
      new AppError("AUTHENTICATION_FAILED", "No token provided.", 401)
    );
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user data
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(
        new AppError("AUTHENTICATION_FAILED", "User not found.", 401)
      );
    }

    // Attach the user object to the request for use in other routes
    req.user = user;
    next();
  } catch (err) {
    next(
      new AppError("AUTHENTICATION_FAILED", "Invalid token.", 401, err.message)
    );
  }
}

async function generateToken(user) {
  try {
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    throw new AppError("token_generation_error", error, 500);
  }
}

module.exports = { authenticateReq, generateToken };
