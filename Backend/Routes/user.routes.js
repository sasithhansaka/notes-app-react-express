import express from "express";
import { registerUser, LoginUser, logout  } from "../Controller/Auth.controller.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);

UserRouter.post("/login", LoginUser);

UserRouter.get("/logout",logout);

export default UserRouter;