import express from "express";
import { registerUser, LoginUser, currentUser } from "../Controller/UserController.js";
import validateToken from "../MIddlewear/validateTokenhandler.js";


const Userrouter = express.Router();

Userrouter.post("/register", registerUser);
Userrouter.post("/login", LoginUser);
Userrouter.get("/currentUser",validateToken, currentUser);

export default Userrouter