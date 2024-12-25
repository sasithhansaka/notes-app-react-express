import User from "../Modles/User_model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv";

const registerUser = asyncHandler(async (req, res) => {
  const { Full_name, email, password } = req.body;

  if (!Full_name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed Password:", hashedPassword);

  const newUser = await User.create({
    Full_name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    console.log(`User created: ${newUser}`);
    res.status(201).json({
      _id: newUser.id,
      Full_name: newUser.Full_name,
      email: newUser.email,
    });
  } else {
    res.status(500);
    throw new Error("Failed to create user");
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          Full_name: user.Full_name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESTOKN,
      { expiresIn: "30m" }
    );
    res.status(200).send({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password Not valid");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.send(req.user);
});

export { registerUser, LoginUser, currentUser };
