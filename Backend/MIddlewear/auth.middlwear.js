import jwt from "jsonwebtoken";
import fs from "fs";
import UserModel from "../Modles/User.model.js";
import issueJwt from "../utils/jwtUtils.js";
import HttpStatus from "../constants/HttpStatus.js";

const ACCESS_TOKEN_PUB_KEY = fs.readFileSync("accessToken_publicKey.pem");
const REFRESH_TOKEN_PUB_KEY = fs.readFileSync("refreshToken_publicKey.pem");

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken;

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthenticated user",
      });
    }

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_PUB_KEY, {
        algorithms: ["RS256"],
      });

      const user = await UserModel.findById(decoded._id).select("-hash -salt");
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        if (!refreshToken) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Unauthenticated user",
          });
        }

        try {
          const refreshDecoded = jwt.verify(refreshToken, REFRESH_TOKEN_PUB_KEY, {
            algorithms: ["RS256"],
          });

          const user = await UserModel.findById(refreshDecoded._id).select("-hash -salt");
          if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              success: false,
              message: "User not found",
            });
          }

          const { access_token } = issueJwt(user._id, user.Full_name);
          res.cookie("accessToken", access_token, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
            secure: true,
          });

          req.user = user;
          return next();
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
    next(error);
  }
};
