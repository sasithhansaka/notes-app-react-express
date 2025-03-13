import mongoose from "mongoose";

const { Schema, model } = mongoose;

const email_format = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new Schema({
  Full_name: {
    type: String,
    required: [true, "please enter Full name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: [true, "email must be unique"],
    trim: true,
    match: [email_format, "invalid email format"],
  },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model("User", UserSchema);

export default UserModel;
