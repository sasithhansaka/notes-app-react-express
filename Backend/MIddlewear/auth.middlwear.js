import jwt from "jsonwebtoken";
import fs from "fs";
import UserModel from "../Modles/User.model.js";
import issueJwt from "../utils/jwtUtils.js";
import HttpStatus from "../constants/HttpStatus.js";

// Load the public keys
const ACCESS_TOKEN_PUB_KEY = fs.readFileSync("accessToken_publicKey.pem", "utf8");
const REFRESH_TOKEN_PUB_KEY = fs.readFileSync("refreshToken_publicKey.pem", "utf8");

export const authenticateUser = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.accessToken?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken;

    // Check if access token is available
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthenticated user",
      });
    }

    // Verify the access token
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_PUB_KEY, {
        algorithms: ["RS256"],
      });

      // Check if user exists
      const user = await UserModel.findById(decoded._id).select("-hash -salt");
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user; // Store user in request
    //   return res.status(HttpStatus.OK).json({
    //     success: true,
    //     message: "Successfully authenticated",
    //     user: {
    //       id: user._id,
    //       fullName: user.Full_name,
    //     },
    //   });
      return next(); 
    } catch (err) {
      // Handle expired token case
      if (err.name === "TokenExpiredError") {
        if (!refreshToken) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Unauthenticated user",
          });
        }

        try {
          // Verify refresh token
          const refreshDecoded = jwt.verify(refreshToken, REFRESH_TOKEN_PUB_KEY, {
            algorithms: ["RS256"],
          });

          // Find the user by refresh token ID
          const user = await UserModel.findById(refreshDecoded._id).select("-hash -salt");
          if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              success: false,
              message: "User not found",
            });
          }

          // Issue new access token
          const { access_token } = issueJwt(user._id, user.Full_name);

          // Send new access token in response cookies
          res.cookie("accessToken", access_token, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
            secure: true,
          });

          req.user = user; // Store user in request
          return next(); // Proceed to the next middleware or route handler
        } catch (refreshError) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Invalid refresh token",
          });
        }
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Invalid access token",
        });
      }
    }
  } catch (error) {
    // Catch any other errors
    next(error);
  }
};
