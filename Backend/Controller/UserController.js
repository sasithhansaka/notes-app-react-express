import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../Modles/UserModel.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { Full_name, email, password } = req.body;

  if (!Full_name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      success: false,
      message: "Email is already registered",
    });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hashedPassword);

  try {
    const newUser = await User.create({
      Full_name,
      email,
      password: hashedPassword,
    });

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
});

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
