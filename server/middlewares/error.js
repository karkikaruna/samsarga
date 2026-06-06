class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export const errorMiddleware = (err, req, res, next) => {

  console.error(`[ERROR] ${err.name || "Error"}: ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";

  
  if (err.isOperational) {
    message = err.message;
  }

  
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID.";
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `An account with this ${field} already exists.`;
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 400;
    message = "Invalid session. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your session has expired. Please log in again.";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(err.errors || {})
      .map((e) => e.message)
      .join(", ");
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default ErrorHandler;
