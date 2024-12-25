import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler((req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESTOKN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorised");
      }

      req.user = decoded.user;
      next();

      // console.log(decoded);
    });
  } else {
    res.status(401);
    throw new Error("No token provided, authorization denied"); 
  }
});

export default validateToken;
