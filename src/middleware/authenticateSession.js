const AppError = require("../utils/AppError");

function authenticateSession(req, res, next) {
  if (req.session.user) {
    // If a user session exists, it means the user is authenticated
    next();
  } else {
    next(new AppError("INVALID_SESSION_TOKEN", "Unauthorized Session", 401));
  }
}

module.exports = authenticateSession;
