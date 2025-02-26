// import asyncHandler from "express-async-handler";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
import { hash } from "bcrypt";
import HttpStatus from "../constants/HttpStatus.js";
import UserModel from "../Modles/User.model.js";

const registerUser = async (req, res, next) => {
  const { password, ...userData } = req.body;


  const userExists = await UserModel.findOne({ email: userData.email });

  if (userExists) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Email is already registered",
    });
  }

  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(password, saltRounds);
  // console.log("Hashed Password:", hashedPassword);

  try {
    const newUser = await UserModel.create({
      ...userData,
      hash:password
    });

    const { access_token, refresh_Token } = issueJwt(
      newUser._id,
      newUser.Full_name,
    );

    
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser.id,
        Full_name: newUser.Full_name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const LoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "all fields required.",
    });
  }

  const user = await User.findOne({ email });

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            Full_name: user.Full_name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESTOKN
      );
      res.status(200).send({ accessToken });
    } else {
      res.status(400).json({
        message: "Email or password Not valid",
        success: false,
      });
    }
  } catch (err) {
    next(err);
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.send(req.user);
});

export { registerUser, LoginUser, currentUser };
