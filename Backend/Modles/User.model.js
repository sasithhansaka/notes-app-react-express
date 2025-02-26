import mongoose from "mongoose";
import { applyPasswordValidatingAndHashing } from "../utils/hashUtils.js";

const { Schema, model } = mongoose;

const email_format = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new Schema({
  Full_name: {
    type: String,
    required: [true, "please enter Full name "],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: [true, "username must be unique"],
    trim: true,
    match: [email_format, "invalid email formats"],
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

applyPasswordValidatingAndHashing(UserSchema);

const UserModel = model("User", UserSchema);

export default UserModel;
