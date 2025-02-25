import mongoose from "mongoose";

const { Schema, model } = mongoose;

const email_format = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new Schema(
  {
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
    password: {
      type: String,
      required: [true, "please enter password"],
      minlength: [6, "Password must be at least 6 characters"],
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
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
