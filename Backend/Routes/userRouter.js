import express from "express";
import { registerUser,LoginUser } from "../Controller/UserController.js";


const Userrouter = express.Router();

Userrouter.post("/register", registerUser);


export default Userrouter;