class AppError extends Error {
  constructor(code, message, statusCode, details) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = AppError;
