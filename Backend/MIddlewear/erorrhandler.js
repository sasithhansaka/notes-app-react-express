const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    switch (statusCode) {
      case 400: 
        res.status(400).json({
          title: "Bad Request",
          message: err.message,
          stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
        break;
      case 401: 
        res.status(401).json({
          title: "Unauthorized",
          message: err.message,
          stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
        break;
      case 403: 
        res.status(403).json({
          title: "Forbidden",
          message: err.message,
          stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
        break;
      case 404:
        res.status(404).json({
          title: "Not Found",
          message: err.message,
          stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
        break;
      case 500: 
      default:
        console.log("all good");
        break;
    }
  };
  
  export default errorHandler;
  