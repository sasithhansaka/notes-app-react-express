const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid input data";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (statusCode === 500) {
    // Explicit handling for 500 Internal Server Error
    message = "Internal Server Error. Please try again later.";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
