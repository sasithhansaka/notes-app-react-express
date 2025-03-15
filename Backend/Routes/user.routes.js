import express from "express";
import { registerUser, LoginUser, logout ,currentUser } from "../Controller/Auth.controller.js";
import { authenticateUser } from "../MIddlewear/auth.middlwear.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);

UserRouter.post("/login", LoginUser);

UserRouter.post("/logout",logout);

UserRouter.get("/currentUser", authenticateUser,currentUser);

export default UserRouter;