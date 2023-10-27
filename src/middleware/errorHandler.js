const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    // Handle known application errors (instances of AppError)
    res.status(err.statusCode).json({
      success: false,
      data: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
  } else {
    // Handle unexpected errors
    console.error(err);
    res.status(500).json({
      success: false,
      data: {
        code: "INTERNAL_ERROR",
        message: "Internal Server Error",
        details: "An unexpected error occurred on the server.",
      },
    });
  }
}

module.exports = errorHandler;
