// import asyncHandler from "express-async-handler";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
import { hash } from "bcrypt";
import HttpStatus from "../constants/HttpStatus.js";
import UserModel from "../Modles/User.model.js";
import { checkPassword } from "../utils/hashUtils.js";

const registerUser = async (req, res, next) => {
  const { password, ...userData } = req.body;

  const userExists = await UserModel.findOne({ email: userData.email });

  if (userExists) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Email is already registered",
    });
  }

  try {
    const newUser = await UserModel.create({
      ...userData,
      hash: password,
    });

    const { access_token, refresh_Token } = issueJwt(
      newUser._id,
      newUser.Full_name
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "invalid email or password",
    });
  }

  try {
    const ismatch = checkPassword(password, user.salt, user.hash);

    if (!ismatch) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }

    const { access_token, refresh_Token } = issueJwt(
      newUser._id,
      newUser.Full_name
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(HttpStatus.OK).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }

  // try {
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const accessToken = jwt.sign(
  //       {
  //         user: {
  //           Full_name: user.Full_name,
  //           email: user.email,
  //           id: user.id,
  //         },
  //       },
  //       process.env.ACCESTOKN
  //     );
  //     res.status(200).send({ accessToken });
  //   } else {
  //     res.status(400).json({
  //       message: "Email or password Not valid",
  //       success: false,
  //     });
  //   }
  // } catch (err) {
  //   next(err);
  // }
};

// const currentUser = asyncHandler(async (req, res) => {
//   res.send(req.user);
// });

const logout = (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
};

export { registerUser, LoginUser, logout };
